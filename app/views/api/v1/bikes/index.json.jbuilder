json.bikes @bikes do |bike|
  json.id bike.id
  json.category bike.category
  json.frame_brand bike.frame_brand
  json.frame_size bike.frame_size
  json.year bike.year
  json.front_rim_size bike.front_rim_size
  json.price_in_cents bike.price_in_cents
  json.model bike.model
end
