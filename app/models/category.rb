class Category < ApplicationRecord
  has_many :bikes
  has_many :products


  CATEGORY_OPTIONS = {
    mountaion_bike: "Mountain Bike",
    dirt_street: "Dirt Street",
    road: "Road",
    urban: "Urbano",
    infant: "Infantil"
  }

  def name_display
    CATEGORY_OPTIONS[category.to_sym]
  end

end
