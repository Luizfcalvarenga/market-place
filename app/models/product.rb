class Product < ApplicationRecord
  include PgSearch::Model
  multisearchable against: [:model, :brand]
  pg_search_scope :global_search,
  against: [ :model, :brand ],
  associated_against: {
    product_type: [ :name ]
  },
  using: {
    tsearch: { prefix: true }
  }
  belongs_to :user
  belongs_to :category
  belongs_to :product_type
  belongs_to :city, optional: true

  belongs_to :state, optional: true

  has_one :advertisement, as: :advertisable
  has_many :likes, as: :likeble
  has_many :chats
  has_many :product_attributes
  has_many :product_type_attributes, through: :product_attributes

  has_many_attached :photos

  validates :name, :category, :modality, :brand, :model, :year,  presence: true
  validates :price_in_cents, :quantity, numericality: { greater_than: 0 }

  default_scope { where(removed_at: nil) }
  WORDS_OPTIONS = {
    "Product": "Produto",
  }

  def word_display()
    WORDS_OPTIONS[name.to_sym]
  end
end
