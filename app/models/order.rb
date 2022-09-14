class Order < ApplicationRecord
  belongs_to :user, optional: true

  validates :invoice_id, uniqueness: true, allow_blank: true
end
