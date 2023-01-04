class Bike < ApplicationRecord
  include PgSearch::Model
  multisearchable against: [:model, :frame_brand]
  pg_search_scope :global_search,
  against: [ :model, :frame_brand ],
  using: {
    tsearch: { prefix: true }
  }


  belongs_to :user
  belongs_to :category
  belongs_to :service, optional: true

  has_one :advertisement, as: :advertisable
  has_many :likes, as: :likeble

  has_many :order_items
  has_many :chats
  has_many_attached :photos

  validates :price_in_cents, :quantity, numericality: { greater_than: 0 }

  validates :price_in_cents, :quantity, :modality, :model, :bike_type, :category, :frame_brand, :model, :year, :frame_size, :frame_material, :bike_condition, :documentation_type, :locality,  presence: true

  default_scope { where(removed_at: nil) }


  TYPE_OPTIONS = {
    bike: "Bike",
    "e-bike": "E-Bike"
  }

  def type_display
    TYPE_OPTIONS[bike_type.to_sym]
  end

end
