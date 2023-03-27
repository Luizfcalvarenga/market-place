class Advertisement < ApplicationRecord
  belongs_to :user
  belongs_to :coupon, optional: true
  belongs_to :advertisable, polymorphic: true

  STATUSES_OPTIONS = {
    pending: "Pendente",
    paid: "Pago",
    waiting_review: "Aguardando Revisão",
    approved: "Publicado",
    update_requested: "Edição Solicitada",
  }

  def status_display
   STATUSES_OPTIONS[status.to_sym]
  end

  ADVERTISABLE_OPTIONS = {
    "Product": "Produto",
    "Bike": "Bike",
  }

  def advertisable_display
   ADVERTISABLE_OPTIONS[advertisable_type.to_sym]
  end


  enum status: {
    pending: "pending",
    paid: "paid",
    waiting_review: "waiting_review",
    approved: "approved",
    update_requested: "update_requested",
  }

  def is_free?
    price_in_cents.zero? || final_price_with_coupon_in_cents == 0
  end


  def perform_after_payment_confirmation_actions
    self.update(status: "paid")
    if is_free?
      self.update(
        value: 0,
        net_value: 0,
        invoice_paid_at: Time.current,
        status: "waiting_review"
      )
    end
  end

  def final_price_with_coupon_in_cents
    return price_in_cents if coupon.blank?
    if coupon.kind_percentage?
      (price_in_cents * (1 - coupon.discount.to_f/100)).to_i
    else
      price_in_cents >= coupon.discount ? price_in_cents - coupon.discount : 0
    end
  end

  def nova_iugu_charge_params_hash
    {
      email: user.email,
      months: 1,
      items:
        [{
          description: "Anúncio de: item##{advertisable_type}",
          quantity: 1,
          price_cents: final_price_with_coupon_in_cents,
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
    !(final_price_with_coupon_in_cents < 100) && !is_free? && (invoice_id.blank? || invoice_status == "expired" || invoice_status == "canceled")
  end

  def check_payment_actions_performed
    status == "paid"
  end
end
