# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'

puts "Starting seed..."

################################################################ USERS ################################################################
buyer = User.create!(email: "user@app.com", password: "123456" )
seller = User.create!(email: "test@app.com", password: "123456" )
bike_user = User.create!(email: "bike@app.com", password: "123456" )



################################################################ CTEGORIES ################################################################

##### BIKES #####

mtb = Category.create!(name: "mountain_bike", modalities: ["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country"])
dirt = Category.create!(name: "dirt_street", modalities: ["street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"])
road = Category.create!(name: "road", modalities: ["speed_performance", "triathlon", "ciclocross", "cicloviagem", "gravel"])
# infant = Category.create!(name: "Infant")
# urban = Category.create!(name: "Urban")

##### GENERAL #####
# mixed = Category.create!(name: "Mixed")

categories = [mtb, dirt, road]


################################################################ PRODUCTS #########################################################
puts "Products types and theis attributtes..."


################################## BIKE COMPONENTS

bike_oriantations = [ "front", "rear", "both"]

bike_types = [ "no_engine", "electric_engine"]



brake = ProductType.create(name: "breake")
bottle_cage = ProductType.create(name: "bottle_cage")
cassette = ProductType.create(name: "Cassete")
chain = ProductType.create(name: "Chain")
chainring = ProductType.create(name: "Chainring")
crankset = ProductType.create(name: "Crankset")
derailleur = ProductType.create(name: "Derailleur")
fender = ProductType.create(name: "Fender")
frame = ProductType.create(name: "Frame")
grips = ProductType.create(name: "Grips")
handlebar = ProductType.create(name: "Handlebar")
headset = ProductType.create(name: "Headset")
hub = ProductType.create(name: "Hub")
pedals = ProductType.create(name: "Pedals")
rim = ProductType.create(name: "Rim")
saddle = ProductType.create(name: "Saddle")
seat_post = ProductType.create(name: "Seat Post")
shifters = ProductType.create(name: "Shifters")
shock = ProductType.create(name: "Shock")
stem = ProductType.create(name: "Stem")
suspension = ProductType.create(name: "Suspension")
tire = ProductType.create(name: "Tire")

############################################################### OTHER PRODUCTS

accessories = ProductType.create(name: "Accessories")
clothing = ProductType.create(name: "Clothing")
kids = ProductType.create(name: "Kids")
equipament = ProductType.create(name: "Equipament")



products_options = [ brake, bottle_cage, cassette, chain, chainring, crankset, derailleur, fender, frame, grips, handlebar, headset, hub, pedals, rim, saddle, seat_post, shifters, shock, stem, suspension, tire, accessories, clothing, kids, equipament ]

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

frame_brands = [ "Alfameq",
  "Astro",
  "Audax",
  "BH",
  "Bianchi",
  "BMC",
  "Caloi",
  "Cannondale",
  "Canyon",
  "Carrera",
  "Cervelo",
  "Corratec",
  "Cube",
  "DABOMB",
  "Felt",
  "First",
  "Focus",
  "Fuji",
  "Giant",
  "Groove",
  "GT",
  "GTS",
  "Ibis",
  "Jamis",
  "Kona",
  "Lapierre",
  "Marin",
  "Merida",
  "Mosso",
  "OGGI",
  "Orbea",
  "Pinarello",
  "Raleigh",
  "Rava",
  "Ridley",
  "Santa Cruz",
  "Schwinn",
  "Scott",
  "Sense",
  "Soul",
  "Specialized",
  "Swift Carbon",
  "Trek",
  "TSW",
  "Wilier",
  "YT",
  "Argon 21",
  "Bliv",
  "BLUE",
  "BOTTECCHIA",
  "Cipollini",
  "CLY",
  "Cumberland",
  "De Rosa",
  "E-Moving",
  "Gary Fisher",
  "Gioia",
  "Kaiena",
  "Kestrel",
  "Kode",
  "Kuota",
  "Lazzaretti",
  "LEV E-BIKE L",
  "Litespeed",
  "Look",
  "Lotus",
  "Mercian",
  "Miyamura Gravel",
  "Open",
  "Quintana Roo",
  "Redland",
  "Riva",
  "Rose",
  "sava",
  "Sundown",
  "Time",
  "Trinx",
  "Trust",
  "Velorbis",
  "Vicinitech",
  "Victory",
  "Eddy Merckx",
  "Salsa",
  "Surly",
  "Soma",
  "Diamondback",
  "Dahon",
  "Outro"
]


road_frame_sizes = [ "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
mtb_dirt_frame_sizes = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]

frame_materials = [ "aluminum ", "carbon", "carbon_aluminum_chainstay", "other"]

frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "documentation_type", kind: "options", options: ["Yes", "No"], prompt: "Possui documentação?" )
frame_question_2 = ProductTypeAttribute.create!(product_type: frame, name: "frame_brand", kind: "options", options: frame_brands, prompt: "Marca do quadro?" )
frame_question_3 = ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "options", options: frame_materials, prompt: "Material do quadro?" )
frame_question_4 = ProductTypeAttribute.create!(product_type: frame, name: "which_category", kind: "options", options: categories, prompt: "Qual categoria?" )
frame_question_5 = ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "options", options: road_frame_sizes + mtb_dirt_frame_sizes, prompt: "Tamanho do quadro?")
frame_question_6 = ProductTypeAttribute.create!(product_type: frame, name: "types_of_rim", kind: "options", options: ["Sport_travel", "Sport_travel_carbon", "Sport_highways_carbon", "Mountain_bike", "Hybrid_bicycles"], prompt: "Tipos de aro?")

frame_questions = [ frame_question_1, frame_question_2, frame_question_3, frame_question_4, frame_question_5, frame_question_6 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

brake_types = [ "v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake" ]

brake_question_1 = ProductTypeAttribute.create!(product_type: brake, name: "documentation_type", kind: "options", options: ["Yes", "No"], prompt: "Possui documentação?" )
brake_question_2 = ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "options", options: brake_types, prompt: "Tipo de freio?" )
brake_question_3 = ProductTypeAttribute.create!(product_type: brake, name: "number_of_pistons", kind: "options", options: [ 2, 4], prompt: "Quantos pistões?" )
brake_question_4 = ProductTypeAttribute.create!(product_type: brake, name: "number_of_disc", kind: "options", options: [ "Front and rear", "Isolated"], prompt: "Quantos discos?" )
brake_question_5 = ProductTypeAttribute.create!(product_type: brake, name: "disc_size", kind: "options", options: [ "120mm", "140mm", "160mm", "180mm", "200mm", "203mm" ], prompt: "Tamanho do disco?" )
brake_question_6 = ProductTypeAttribute.create!(product_type: brake, name: "inclusdes_assessories", kind: "options", options: ["Yes", "No"], prompt: "Inclui manetes e capipers?" )

brake_questions = [ brake_question_1, brake_question_2, brake_question_3, brake_question_4, brake_question_5, brake_question_6 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

rim_sizes = [ "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]
rim_materials = [ "aluminum", "carbon", "carbono_alumínio_chainstay", "outro"]


rim_question_1 = ProductTypeAttribute.create!(product_type: rim, name: "rim_size", kind: "options", options: rim_sizes, prompt: "Tamanho?" )
rim_question_2 = ProductTypeAttribute.create!(product_type: rim, name: "rim_holes", kind: "options", options: (1..5).to_a, prompt: "Quantos furos?" )
rim_question_3 = ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "options", options: rim_materials, prompt: "Qual material?" )

rim_questions = [ rim_question_1, rim_question_2, rim_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


suspension_types = [ "no_suspension", "hardtail", "full_suspension"]
front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "Outro"]
rear_suspension_travels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "Outro"]

suspension_question_1 = ProductTypeAttribute.create!(product_type: suspension, name: "documentation_type", kind: "options", options: ["Sim", "Não"], prompt: "Possui documentação?" )
suspension_question_2 = ProductTypeAttribute.create!(product_type: suspension, name: "suspension_type", kind: "options", options: suspension_types, prompt: "Tipo de suspenção?" )
suspension_question_3 = ProductTypeAttribute.create!(product_type: suspension, name: "front_suspension_travel", kind: "options", options: front_suspension_travels, prompt: "Suspensão dianteira")
suspension_question_4 = ProductTypeAttribute.create!(product_type: suspension, name: "rear_suspension_travel", kind: "options", options: rear_suspension_travels, prompt: "Suspensão dianteira")
suspension_question_5 = ProductTypeAttribute.create!(product_type: suspension, name: "rim_size", kind: "options", options: rim_sizes, prompt: "Tamanho do aro?" )

suspension_questions = [ suspension_question_1, suspension_question_2, suspension_question_3, suspension_question_4, suspension_question_5 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SHOCK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

shock_sizes = [ "100mm", "120mm", "130mm", "140mm", "150mm", "160mm", "165mm", "180mm", "200mm" ]


shock_question_1 = ProductTypeAttribute.create!(product_type: shock, name: "shock_size", kind: "options", options: shock_sizes, prompt: "Tamanho?" )


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


velocity_numbers_options= [ 1, 2, 3, 7, 8, 9, 10, 11, 12 ]

derailleur_question_1 = ProductTypeAttribute.create!(product_type: derailleur, name: "derailleur_number", kind: "options", options: bike_oriantations, prompt: "Tipo de câmbio?" )
derailleur_question_2 = ProductTypeAttribute.create!(product_type: derailleur, name: "derailleur_velocities", kind: "options", options: velocity_numbers_options, prompt: "Quantas velocidades?" )
derailleur_question_3 = ProductTypeAttribute.create!(product_type: derailleur, name: "derailleur_teeth", kind: "options", options: (1..40).to_a, prompt: "Relação?" )

derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


seat_post_types = ["retractable", "rigid"]
seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm" ]


seat_post_question_1 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "options", options: seat_post_types, prompt: "Tipo do canote?" )
seat_post_question_2 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "options", options: seat_post_travels, prompt: "Curso do canote?" )

seat_post_questions = [ seat_post_question_1, seat_post_question_2 ]



# Battery not sold separately **


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COMPONENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


puts "Creating 10 Products and their products attributes..."

10.times do
  user = [buyer, seller, bike_user].sample
  category = categories.sample

  product = Product.create!(user: user,
    category: category,
    modality: category.modalities.sample,
    product_type: products_options.sample,
    brand: ["Nuflow", "Damatta", "Nomad"].sample,
    name: "òtimo produto",
    description: "Único dono com funcinamento perfeito",
    price_in_cents: rand(10000..50000),
    quantity: rand(1..10)

  )

  product_attributes =  ProductTypeAttribute.where(product_type: product.product_type).each do | product_type_attribute |
    ProductAttribute.create!(product: product, product_type_attribute: product_type_attribute, value: product_type_attribute.options.sample)
  end
end


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BIKES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

bike_conditions = ["new", "used" ]

structural_visual_condition = ["Perfect condition, no obsevations", "Minor scratches or surface scratches", "Spalls in the paint", "Spalls in the paint", "Frame painted", "Frame welded or repaired", "Frame has cracks or fissures that must be repaired", "Products welded or repaired", "Products has cracks or fissures that must be repaired" ]

opareting_condition = ["Gears worn out (> 75%)", "Shifters not working properly", "Front suspension not working properly", "Rear suspension not working properly", "Suspensions lock not working properly", "Brake not working properly", "Retractable seat post not working properly", "Creaking noises when pedaling", "Wheels are bent", "Tyres worn out(> 50%)"]


puts "Creating 10 Bikes..."

10.times do
  category = [mtb, dirt, road].sample

  bike = Bike.create!(
    category_id:  category.id,
    modality: category.modalities.sample,
    bike_type: "No Engine",
    price_in_cents: rand(10000000..22000000),
    quantity: 1,
    locality: "Belo Horizonte",
    user_id: (User.ids).sample,
    frame_brand: frame_brands.sample,
    model: ["GTX", "Sense mt-4r", "Oggi predator", "Alfameq trilheiro", "Specialized GTR"].sample,
    year: ["2017", "2018", "2019", "2020", "2021", "2022"].sample,
    frame_size: (road_frame_sizes + mtb_dirt_frame_sizes).sample,
    frame_material: "Aluminium",
    rim_size: "19'",
    number_of_front_gears: 1,
    number_of_rear_gears: 16,
    brake_type: "Freio a disco",
    suspension_type: "Full suspension",
    front_suspension_travel: "100 mm",
    rear_suspension_travel: "110 mm",
    seat_post_type: "Retrátil",
    seat_post_travel: "100 mm",
    weight: [ 15.0, 16.3, 15.7, 17.4].sample,
    bike_conditions: "Usada",
    structural_visual_condition: structural_visual_condition.sample,
    opareting_condition: opareting_condition.sample,
    documentation_type: ["Nota fiscal", "Documento de importação", "Cupom Fiscal Estrangeiro"].sample,
    description: "Bicicleta em perfeito estado apenas 1 dono.",
    accessories: false
  )
end

puts "Seed finished"
