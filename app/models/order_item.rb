class OrderItem < ApplicationRecord
  belongs_to :bike, optional: true
  belongs_to :component, optional: true
  belongs_to :service, optional: true
  # belongs_to :order
end
