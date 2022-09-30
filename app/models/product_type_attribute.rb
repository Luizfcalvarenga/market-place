class ProductTypeAttribute < ApplicationRecord
  belongs_to :product_type

  has_many :product_attributes

  def self.return_questions_for_new_product_type(product_id)
    @product_attr = ProductTypeAttribute.where(product_type_id: product_id)
  end
end
