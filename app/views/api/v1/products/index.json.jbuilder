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
  json.locality product.locality
  json.year product.year
  json.photos product.photos.first(2).map(&:url)
end
json.product_types @product_types
json.product_type_attributes @product_type_attributes
