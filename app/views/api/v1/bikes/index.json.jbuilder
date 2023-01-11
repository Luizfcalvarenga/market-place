json.bikes @bikes do |bike|
  json.id bike.id
  json.user_id bike.user_id
  json.category bike.category
  json.modality bike.modality
  json.bike_type bike.bike_type
  json.price_in_cents bike.price_in_cents
  json.quantity bike.quantity
  json.locality bike.locality
  json.frame_brand bike.frame_brand
  json.frame_size bike.frame_size
  json.frame_material bike.frame_material
  json.model bike.model
  json.year bike.year
  json.front_rim_model bike.front_rim_model
  json.rear_rim_model bike.rear_rim_model
  json.number_of_front_gears bike.number_of_front_gears
  json.number_of_rear_gears bike.number_of_rear_gears
  json.brake_type bike.brake_type
  json.brake_disc_size bike.brake_disc_size
  json.suspension_type bike.suspension_type
  json.front_suspension_travel bike.front_suspension_travel
  json.rear_suspension_travel bike.rear_suspension_travel
  json.seat_post_model bike.seat_post_model
  json.seat_post_type bike.seat_post_type
  json.seat_post_travel bike.seat_post_travel
  json.weight bike.weight
  json.bike_condition bike.bike_condition
  json.structural_visual_condition bike.structural_visual_condition
  json.operating_condition bike.operating_condition
  json.documentation_type bike.documentation_type
  json.description bike.description
  json.accessories bike.accessories
  json.accessories_description bike.accessories_description
  json.battery bike.battery
  json.front_suspension_model bike.front_suspension_model
  json.rear_suspension_model bike.rear_suspension_model
  json.front_derailleur_model bike.front_derailleur_model
  json.rear_derailleur_model bike.rear_derailleur_model
  json.crankset bike.crankset
  json.chain bike.chain
  json.brake_model bike.brake_model
  json.front_hub bike.front_hub
  json.rear_hub bike.rear_hub
  json.front_tyre bike.front_tyre
  json.rear_tyre bike.rear_tyre
  json.handlebar bike.handlebar
  json.stem bike.stem
  json.motor bike.motor
  json.mileage bike.mileage
  json.rim_size bike.rim_size
  json.pedals bike.pedals
  json.battery_cycles bike.battery_cycles
  json.photos bike.photos.first(2).map(&:url)
end
