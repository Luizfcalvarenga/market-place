json.products @products do |product|
  json.id product.id
  json.user product.user
  json.category product.category
  json.modality product.modality
  json.product_type product.product_type
  json.brand product.brand
  json.name product.name
  json.description product.description
  json.price_in_cents product.price_in_cents
  json.quantity product.quantity
end
json.product_types @product_types
json.product_type_attributes @product_type_attributes
