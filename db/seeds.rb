# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "user@test.com", password: "123456")

Bike.create(category: "MTB", age: 2, size: "10")
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
