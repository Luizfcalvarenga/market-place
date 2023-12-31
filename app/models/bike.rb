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
  belongs_to :city, optional: true

  belongs_to :state, optional: true

  has_one :advertisement, as: :advertisable
  has_many :likes, as: :likeble

  has_many :order_items
  has_many :chats
  has_many_attached :photos

  validates :price_in_cents, :quantity, numericality: { greater_than: 0 }

  # validates :price_in_cents, :quantity, :modality, :model, :bike_type, :category, :frame_brand, :model, :year, :city_id, :state_id, :frame_size, :frame_material, :bike_condition, :documentation_type,  presence: true

  default_scope { where(removed_at: nil) }

  TYPE_OPTIONS = {
    bike: "Bike",
    "e-bike": "E-Bike"
  }

  def type_display
    TYPE_OPTIONS[bike_type.to_sym]
  end

  MODALITY_OPTIONS = {
    mountain_bike: "Mountain Bike",
    downhill: "Downhill",
    enduro: "Enduro",
    gravel: "Gravel",
    speed: "Speed",
    trail: "Trail",
    xc_cross_country: "XC Cross Country",
    street_bmx: "Street BMX",
    race_bmx: "Race BMX",
    big_wheel_bmx: "Big Wheel BMX",
    dirt_jump: "Dirt Jump",
    speed_performance: "Speed Performance",
    triathlon: "Triathlon",
    ciclocross: "Ciclocross",
    cicloviagem: "Cicloviagem",
  }
  def modality_display
    MODALITY_OPTIONS[modality.to_sym]
  end

  CONDITION_OPTIONS = {
    "Product": "Produto",
    "used": "Usado",
    "new": "Novo",
  }
  def condition_display()
    CONDITION_OPTIONS[bike_condition.to_sym]
  end

  MATERIAL_OPTIONS = {
    "aluminum": "Alumínio",
    "carbon": "Carbono",
    "carbon_aluminum_chainstay": "Carbono/Aumínio (Chainstay)",
  }
  def material_display()
    MATERIAL_OPTIONS[frame_material.to_sym || wheel_material.to_sym || seat_post_material.to_sym || handlebar_material.to_sym || fork_material.to_sym]
  end



end
