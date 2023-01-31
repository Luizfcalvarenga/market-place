class Category < ApplicationRecord
  has_many :bikes
  has_many :products


  CATEGORY_OPTIONS = {
    mountain_bike: "Mountain Bike",
    dirt_street: "Dirt Street",
    road: "Road",
    urban: "Urbano",
    infant: "Infantil"
  }


  def name_display
    CATEGORY_OPTIONS[name.to_sym]
  end


  MODALITY_OPTIONS = {
    downhill: "Downhill",
    enduro: "Enduro",
    gravel: "Gravel",
    speed: "Speed",
    trail: "Trail",
    xc_cross_country: "XC Cross Country",
    street_bmx: "Street BMX",
    race_bmx: "Race BMX",
    big_wheel_bmx: "Big Wheel BMX",
    dirt_jump: "Dirt Jump",
    speed_performance: "Speed Performance",
    triathlon: "Triathlon",
    ciclocross: "Ciclocross",
    cicloviagem: "Cicloviagem",
  }
  def modality_diplay
    MODALITY_OPTIONS[modality.to_sym]
  end

end
