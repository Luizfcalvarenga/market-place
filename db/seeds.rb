# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: "bike@app.com", password: "123456" )
user_2 = User.create(email: "test@app.com", password: "123456" )


mtb = Category.create(name: "Mountain Bike", modalities: ["Downhill", "Enduro", "Gravel", "Speed", "Trail", "XC (Cross Country)"])
dirt = Category.create(name: "Dirt/Street", modalities: ["Street BMX", "Race BMX", "BIig Wheel BMX", "Dirt Jump", "Trail", "XC (Cross Country)"])
road = Category.create(name: "Road", modalities: ["Speed / Performance", "Triathlon", "Ciclocross", "Cicloviagem", "Gravel"])


Component.create(name: "Breake")
Component.create(name: "Frame")
Component.create(name: "Suspension")
Component.create(name: "Seat Post")
Component.create(name: "Rim")
Component.create(name: "Saddle")
Component.create(name: "Shock")
Component.create(name: "Handlebar")
Component.create(name: "Crankset")
Component.create(name: "Shifters")
Component.create(name: "Stem")
Component.create(name: "Pedals")
Component.create(name: "Derailleur")
Component.create(name: "Grips")
Component.create(name: "Headset")


User.create(email: "bike@app.com", password: "123456" )
Bike.create(user: user, category:  mtb, modality: mtb.modalities.sample, price_in_cents: 2200000, locality: "Belo Horizonte", frame_brand: "Alfameq", model: "GTX", year: "2021", frame_size: "55", frame_material: "Aluminium", rim_size "19'",  number_of_front_gears: 1 number_of_rear_gears: 16, brake_type: "Freio a disco", suspension_type: "Full suspension", front_suspension_travel: "100 mm", front_suspension_travel: "110 mm")
Bike.create(category: "MTB", age: 1, size: "9")
Bike.create(category: "MTB", age: 3, size: "10")
Bike.create(category: "MTB", age: 4, size: "10")
Bike.create(category: "MTB", age: 5, size: "9")
Bike.create(category: "MTB", age: 4, size: "10")
Bike.create(category: "MTB", age: 2, size: "12")
Bike.create(category: "MTB", age: 3, size: "10")
Bike.create(category: "MTB", age: 2, size: "10")
Bike.create(category: "BMX", age: 1, size: "10")
Bike.create(category: "BMX", age: 0, size: "10")
Bike.create(category: "BMX", age: 0, size: "10")
Bike.create(category: "BMX", age: 2, size: "8")
Bike.create(category: "BMX", age: 2, size: "7")
Bike.create(category: "BMX", age: 2, size: "7")
Bike.create(category: "BMX", age: 2, size: "10")
Bike.create(category: "Road", age: 2, size: "12")
Bike.create(category: "Road", age: 1, size: "13")
Bike.create(category: "Road", age: 1, size: "12")
Bike.create(category: "Urbano", age: 4, size: "11")
Bike.create(category: "Urbano", age: 5, size: "10")
Bike.create(category: "Urbano", age: 6, size: "8")
