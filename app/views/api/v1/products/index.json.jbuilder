json.products @products do |product|
  json.id product.id
  json.user product.user
  json.category product.category
  json.modality product.modality
  json.product_type product.product_type
  json.name product.name
  json.brand product.brand
  json.model product.model
  json.description product.description
  json.price_in_cents product.price_in_cents
  json.quantity product.quantity
  json.state_id product.state_id
  json.city_id product.city_id
  json.year product.year
  json.product_condition_status product.product_condition_status
  json.product_condition_description product.product_condition_description
  json.photos product.photos.first(2).map(&:url)
end
json.product_types @product_types
json.product_type_attributes @product_type_attributes
