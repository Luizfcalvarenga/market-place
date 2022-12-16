class Advertisement < ApplicationRecord
  belongs_to :user
  belongs_to :advertisable, polymorphic: true

  PRODUCT_TYPE_OPTIONS = {
    pending: "pending",
    paid: "paid",
    waiting_review: "waiting_review",
    approved: "approved",
    adjustments_requested: "adjustments_requested",
    update_request: "update_request",

  }

  def status_display
   STATUSES_OPTIONS[status.to_sym]
  end


  enum status: {
    pending: "pending",
    paid: "paid",
    waiting_review: "waiting_review",
    approved: "approved",
    adjustments_requested: "adjustments_requested",
    update_request: "update_request",
  }

  def is_free?
    price_in_cents.zero?
  end


  def perform_after_payment_confirmation_actions
    self.update(status: "paid")

    if is_free?
      self.update(
        value: 0,
        net_value: 0,
        invoice_paid_at: Time.current
      )
    end
  end

  def nova_iugu_charge_params_hash
    {
      email: user.email,
      months: 1,
      items:
        [{
          description: "Anúncio de: item##{advertisable.id}",
          quantity: 1,
          price_cents: price_in_cents,
        }],


      payer: {
        name: user.email,
        cpf_cnpj: user.document_number,
        address: {
          zip_code: user.cep,
          number: "-",
        }
      },
      ignore_due_email: true,
      ignore_canceled_email: true,
      due_date: (Time.current + 10.days),
      payable_with: ["pix", "credit_card", "bank_slip"]
    }
  end

  def should_generate_new_invoice?
    invoice_id.blank? || invoice_status == "expired" || invoice_status == "canceled"
  end

  def check_payment_actions_performed
    status == "paid"
  end
end
