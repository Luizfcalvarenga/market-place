class Advertisement < ApplicationRecord
  belongs_to :user
  belongs_to :advertisable, polymorphic: true

  enum status: {
    pending: "pending",
    started: "started",
    paid: "paid",
    waiting_review: "waiting_review",
    approved: "approved",
    adjustments_requested: "adjustments_requested",
    rejected: "rejected",
  }

  FILE_UPLOAD_FIELDS = [
    :card_photo, :card_document_photo_front, :card_document_photo_back,
    :card_institution_statement_photo, :photo, :document_photo_front,
    :document_photo_back, :institution_statement_photo
  ]
  
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

  def advertisement_price
    first_announce = 50000
    second_announce = 250000
    third_announce = 500000
    fourth_announce = 1000000

    if first_announce < advertisable.price_in_cents <= second_announce
      price_in_cents = 5000
    elsif second_announce < advertisable.price_in_cents <= third_announce
      price_in_cents = 10000
    elsif third_announce < advertisable.price_in_cents <= fourth_announce
      price_in_cents = 15000
    elsif advertisable.price_in_cents > fourth_announce
      price_in_cents = 20000
    end
  end



  def should_generate_new_invoice?
    invoice_id.blank? || invoice_status == "expired" || invoice_status == "canceled"
  end

  def check_payment_actions_performed
    status == "paid" && advertisement.count == advertisable.count
  end

end
