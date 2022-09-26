class ProductType < ApplicationRecord
  has_many :product_type_attributes
  has_many :products
end
