class ProductAttribute < ApplicationRecord
  belongs_to :product
  belongs_to :product_type_attribute
  
  # def self.create_product_attribute(product_type_attribute_id, value)
  #   @product_attribute = ProductAttribute.create(
  #     product_type_id: Product.all.ids.last + 1
  #     product_type_attribute_id: product_type_attribute_id
  #     value: value
  #   )
  # end
end
