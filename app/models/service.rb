class Service < ApplicationRecord
  has_many :order_items
  has_many :bikes
end
