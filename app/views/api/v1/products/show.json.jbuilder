json.id @product.id
json.user @product.user
json.category @product.category
json.modality @product.modality
json.product_type @product.product_type
json.name @product.name
json.brand @product.brand
json.model @product.model
json.description @product.description
json.price_in_cents @product.price_in_cents
json.quantity @product.quantity
json.product_attributes @product_attributes
json.product_type_attributes @product_type_attributes
json.photos @product.photos
json.state @product.state
json.city @product.city
json.year @product.year
json.documentation_type @product.documentation_type
json.condition @product.condition
json.product_condition_status @product.product_condition_status
json.verified @product.verified

json.product_condition_description @product.product_condition_description
json.present_ids @present_ids
json.city @city
json.state @state

json.photos @product.photos.map(&:url)
