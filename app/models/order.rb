class Order < ApplicationRecord
  belongs_to :user, optional: true

  has_many :order_items

  validates :invoice_id, uniqueness: true, allow_blank: true
end
