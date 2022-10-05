class ProductTypeAttribute < ApplicationRecord
  belongs_to :product_type

  has_many :product_attributes


end
