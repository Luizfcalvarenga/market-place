class Bike < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :service, optional: true

  has_many :order_items
  has_many :chats

  validates :price_in_cents, :quantity, :modality, :model, presence: true
end
