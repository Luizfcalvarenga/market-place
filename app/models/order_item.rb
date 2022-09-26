class OrderItem < ApplicationRecord
  belongs_to :bike, optional: true
  belongs_to :product, optional: true
  belongs_to :service, optional: true
  # belongs_to :order
end
