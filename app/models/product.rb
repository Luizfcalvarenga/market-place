class Product < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :product_type

  has_many :product_attributes
  has_many :product_type_attributes, through: :product_attributes

  has_many_attached :photos

  validates :price_in_cents, :quantity, numericality: { greater_than: 0 }



  default_scope { where(removed_at: nil) }



end
