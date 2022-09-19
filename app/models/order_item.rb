class OrderItem < ApplicationRecord
  belongs_to :bike
  belongs_to :component
  belongs_to :service
end
