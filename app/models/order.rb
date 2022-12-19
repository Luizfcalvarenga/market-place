class Order < ApplicationRecord
  belongs_to :user, optional: true

  has_many :order_items
  has_many :products, through: :order_items
  has_many :bikes, through: :order_items

  validates :invoice_id, uniqueness: true, allow_blank: true

  # scope :paid, -> { where(status: "paid")}

  # def perform_after_payment_confirmation_actions
  #   self.update(status: "paid")
  #   self.update(price_in_cents: order_items.map(&:price_in_cents).sum)
  # end

  # def nova_iugu_charge_params_hash
  #   {
  #     email: user.email,
  #     months: 1,
  #     items: order_items.map do |order_item|
  #       {
  #         description: "Item: #{order_item.product.name}",
  #         quantity: order_item.quantity,
  #         price_cents: order_item.price_in_cents,
  #       }
  #     end,

  #     payer: {
  #       name: user.email,
  #       cpf_cnpj: user.document_number,
  #       address: {
  #         zip_code: user.cep,
  #         number: "-",
  #       }
  #     },
  #     ignore_due_email: true,
  #     ignore_canceled_email: true,
  #     due_date: (Time.current + 10.days),
  #     payable_with: payment_method
  #   }
  # end

  # def payment_method
  #   if (price_in_cents / 100) > 4500
  #     ["pix", "bank_slip"]
  #   else
  #     ["pix", "credit_card", "bank_slip"]
  #   end
  # end

  # def price_in_cents
  #   order_items.map(&:price_in_cents).sum
  # end

  # def should_generate_new_invoice?
  #   invoice_id.blank? || invoice_status == "expired" || invoice_status == "canceled"
  # end

  # def check_payment_actions_performed
  #   status == "paid"
  # end
end
