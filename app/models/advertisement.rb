class Advertisement < ApplicationRecord
  belongs_to :user
  belongs_to :advertisable, polymorphic: true

  def perform_after_payment_confirmation_actions
    self.update(status: "paid")
  end

  def nova_iugu_charge_params_hash
    {
      email: user.email,
      months: 1,
      items:
        [{
          description: "Anúncio de: #{advertisable.name}",
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
