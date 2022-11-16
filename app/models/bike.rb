class Bike < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :service, optional: true

  has_many :order_items
  has_many :chats
  has_many_attached :photos

  validates :price_in_cents, :quantity, numericality: { greater_than: 0 }

  # validates :price_in_cents, :quantity, :modality, :model, :bike_type, :category, :frame_brand, :model, :year, :frame_size, :frame_material, :bike_conditions, :documentation_type, :locality,  presence: true

  default_scope { where(removed_at: nil) }

end
