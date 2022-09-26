class ProductAttribute < ApplicationRecord
  belongs_to :product
  belongs_to :product_type_attribute
end
