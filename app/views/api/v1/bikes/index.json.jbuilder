json.bikes @bikes do |bike|
  json.id bike.id
  json.category bike.category
  json.age bike.age
  json.size bike.size
  json.size_unit "m"
end
