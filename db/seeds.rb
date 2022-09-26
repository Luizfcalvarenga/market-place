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

mtb = Category.create!(name: "Mountain Bike", modalities: '["Downhill", "Enduro", "Gravel", "Speed", "Trail", "XC (Cross Country)"]')
dirt = Category.create!(name: "Dirt/Street", modalities: '["Street BMX", "Race BMX", "Big Wheel BMX", "Dirt Jump"]')
road = Category.create!(name: "Road", modalities: '["Speed / Performance", "Triathlon", "Ciclocross", "Cicloviagem", "Gravel"]')
# infant = Category.create!(name: "Infant")
# urban = Category.create!(name: "Urban")

##### GENERAL #####
# mixed = Category.create!(name: "Mixed")

categories = [mtb, dirt, road]


################################################################ BIKES_COMPONENTS #########################################################
puts "Bike component types and theis attributtes..."

bike_oriantations = [ "Front", "Rear", "Both"]

bike_types = [ "No Engine", "Electric Engine"]


brake = ComponentType.create(name: "Breake")
bottle_cage = ComponentType.create(name: "Bottle Cage")
cassette = ComponentType.create(name: "Cassete")
chain = ComponentType.create(name: "Chain")
chainring = ComponentType.create(name: "Chainring")
crankset = ComponentType.create(name: "Crankset")
derailleur = ComponentType.create(name: "Derailleur")
fender = ComponentType.create(name: "Fender")
frame = ComponentType.create(name: "Frame")
grips = ComponentType.create(name: "Grips")
handlebar = ComponentType.create(name: "Handlebar")
headset = ComponentType.create(name: "Headset")
hub = ComponentType.create(name: "Hub")
pedals = ComponentType.create(name: "Pedals")
rim = ComponentType.create(name: "Rim")
saddle = ComponentType.create(name: "Saddle")
seat_post = ComponentType.create(name: "Seat Post")
shifters = ComponentType.create(name: "Shifters")
shock = ComponentType.create(name: "Shock")
stem = ComponentType.create(name: "Stem")
suspension = ComponentType.create(name: "Suspension")
tire = ComponentType.create(name: "Tire")


components_options = [ brake, bottle_cage, cassette, chain, chainring, crankset, derailleur, fender, frame, grips, handlebar, headset, hub, pedals, rim, saddle, seat_post, shifters, shock, stem, suspension, tire ]

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

frame_materials = [ "Alumínio","Carbono", "Carbono / Alumínio (chainstay)", "Outro"]

frame_question_1 = ComponentTypeAttribute.create!(component_type: frame, name: "documentation_type", kind: "options", options: ["Yes", "No"], prompt: "Possui documentação?" )
frame_question_2 = ComponentTypeAttribute.create!(component_type: frame, name: "frame_brand", kind: "options", options: frame_brands, prompt: "Marca do quadro?" )
frame_question_3 = ComponentTypeAttribute.create!(component_type: frame, name: "frame_material", kind: "options", options: frame_materials, prompt: "Material do quadro?" )
frame_question_4 = ComponentTypeAttribute.create!(component_type: frame, name: "which_category", kind: "options", options: categories, prompt: "Qual categoria?" )
frame_question_5 = ComponentTypeAttribute.create!(component_type: frame, name: "frame_size", kind: "options", options: [ road_frame_sizes, mtb_dirt_frame_sizes].sample, prompt: "Tamanho do quadro?")
frame_question_6 = ComponentTypeAttribute.create!(component_type: frame, name: "types_of_rim", kind: "options", options: ["Sport Travel", "Sport Travel/Carbon", "Sport Highways/Carbon", "Mountain Bike", "Hybrid Bicycles"], prompt: "Tipos de aro?")

frame_questions = [ frame_question_1, frame_question_2, frame_question_3, frame_question_4, frame_question_5, frame_question_6 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

brake_types = [ "V-brake (frenagem no aro)", "À Disco - Hidráulico", "À Disco - Mecânico", "Contra pedal" ]

brake_question_1 = ComponentTypeAttribute.create!(component_type: brake, name: "documentation_type", kind: "options", options: ["Yes", "No"], prompt: "Possui documentação?" )
brake_question_2 = ComponentTypeAttribute.create!(component_type: brake, name: "brake_type", kind: "options", options: brake_types, prompt: "Tipo de freio?" )
brake_question_3 = ComponentTypeAttribute.create!(component_type: brake, name: "number_of_pistons", kind: "options", options: [ 2, 4], prompt: "Quantos pistões?" )
brake_question_4 = ComponentTypeAttribute.create!(component_type: brake, name: "number_of_disc", kind: "options", options: [ "Front and rear", "Isolated"], prompt: "Quantos discos?" )
brake_question_5 = ComponentTypeAttribute.create!(component_type: brake, name: "disc-size", kind: "options", options: [ "120mm", "140mm", "160mm", "180mm", "200mm", "203mm" ], prompt: "Tamanho do disco?" )
brake_question_6 = ComponentTypeAttribute.create!(component_type: brake, name: "inclusdes_assessories", kind: "options", options: ["Yes", "No"], prompt: "Inclui manetes e capipers?" )

brake_questions = [ brake_question_1, brake_question_2, brake_question_3, brake_question_4, brake_question_5, brake_question_6 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

rim_sizes = [ "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]
rim_materials = [ "Alumínio","Carbono", "Carbono / Alumínio (chainstay)", "Outro"]


rim_question_1 = ComponentTypeAttribute.create!(component_type: rim, name: "rim_size", kind: "options", options: rim_sizes, prompt: "Tamanho?" )
rim_question_2 = ComponentTypeAttribute.create!(component_type: rim, name: "rim_holes", kind: "options", options: (1..5).to_a, prompt: "Quantos furos?" )
rim_question_3 = ComponentTypeAttribute.create!(component_type: rim, name: "rim_material", kind: "options", options: rim_materials, prompt: "Qual material?" )

rim_questions = [ rim_question_1, rim_question_2, rim_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


suspension_types = [ "Sem suspensão", "Hardtail (apenas suspensão dianteira)", "Full Suspension (suspensão dianteira e traseira)"]
front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "Outro"]
rear_suspension_travels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "Outro"]

suspension_question_1 = ComponentTypeAttribute.create!(component_type: suspension, name: "documentation_type", kind: "options", options: ["Sim", "Não"], prompt: "Possui documentação?" )
suspension_question_2 = ComponentTypeAttribute.create!(component_type: suspension, name: "suspension_type", kind: "options", options: suspension_types, prompt: "Tipo de suspenção?" )
suspension_question_3 = ComponentTypeAttribute.create!(component_type: suspension, name: "front_suspension_travel", kind: "options", options: front_suspension_travels, prompt: "Suspensão dianteira")
suspension_question_4 = ComponentTypeAttribute.create!(component_type: suspension, name: "rear_suspension_travel", kind: "options", options: rear_suspension_travels, prompt: "Suspensão dianteira")
suspension_question_5 = ComponentTypeAttribute.create!(component_type: suspension, name: "rim_size", kind: "options", options: rim_sizes, prompt: "Tamanho do aro?" )

suspension_questions = [ suspension_question_1, suspension_question_2, suspension_question_3, suspension_question_4, suspension_question_5 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SHOCK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

shock_sizes = [ "100mm", "120mm", "130mm", "140mm", "150mm", "160mm", "165mm", "180mm", "200mm" ]


shock_question_1 = ComponentTypeAttribute.create!(component_type: shock, name: "shock_size", kind: "options", options: shock_sizes, prompt: "Tamanho?" )


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


velocity_numbers_options= [ 1, 2, 3, 7, 8, 9, 10, 11, 12 ]

derailleur_question_1 = ComponentTypeAttribute.create!(component_type: derailleur, name: "derailleur_number", kind: "options", options: bike_oriantations, prompt: "Tipo de câmbio?" )
derailleur_question_2 = ComponentTypeAttribute.create!(component_type: derailleur, name: "derailleur_velocities", kind: "options", options: velocity_numbers_options, prompt: "Quantas velocidades?" )
derailleur_question_3 = ComponentTypeAttribute.create!(component_type: derailleur, name: "derailleur_teeth", kind: "options", options: (1..40).to_a, prompt: "Relação?" )

derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


seat_post_types = ["Retractable", "Rigid"]
seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm" ]


seat_post_question_1 = ComponentTypeAttribute.create!(component_type: seat_post, name: "seat_post_type", kind: "options", options: seat_post_types, prompt: "Tipo do canote?" )
seat_post_question_2 = ComponentTypeAttribute.create!(component_type: seat_post, name: "seat_post_travel", kind: "options", options: seat_post_travels, prompt: "Curso do canote?" )

seat_post_questions = [ seat_post_question_1, seat_post_question_2 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


battery_capacity = ["320Wh", "500Wh", "625Wh", "700Wh" ]

# Battery not sold separately **


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COMPONENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


puts "Creating 10 Components and their components attributes..."

10.times do
  user = [buyer, seller, bike_user].sample
  category = categories.sample

  component = Component.create!(user: user,
    category: category,
    modality: JSON[category.modalities].sample,
    component_type: components_options.sample,
    name: "Peça em bom estado",
    description: "Único dono com funcinamento perfeito",
    price_in_cents: rand(10000..50000),
    quantity: rand(1..10)

  )

  component_attributes =  ComponentTypeAttribute.where(component_type: component.component_type).each do | component_type_attribute |
    ComponentAttribute.create!(component: component, component_type_attribute: component_type_attribute, value: JSON[component_type_attribute.options].sample)
  end
end


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BIKES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

bike_conditions = ["Nova", "Usada" ]

structural_visual_condition = ["Perfect condition, no obsevations", "Minor scratches or surface scratches", "Spalls in the paint", "Spalls in the paint", "Frame painted", "Frame welded or repaired", "Frame has cracks or fissures that must be repaired", "Components welded or repaired", "Components has cracks or fissures that must be repaired" ]

opareting_condition = ["Gears worn out (> 75%)", "Shifters not working properly", "Front suspension not working properly", "Rear suspension not working properly", "Suspensions lock not working properly", "Brake not working properly", "Retractable seat post not working properly", "Creaking noises when pedaling", "Wheels are bent", "Tyres worn out(> 50%)"]


puts "Creating 10 Bikes..."

10.times do
  category = [mtb, dirt, road].sample

  bike = Bike.create!(
    category_id:  category.id,
    modality: JSON[category.modalities].sample,
    bike_type: "No Engine",
    price_in_cents: rand(10000000..22000000),
    quantity: 1,
    locality: "Belo Horizonte",
    user_id: (User.ids).sample,
    frame_brand: frame_brands.sample,
    model: "GTX",
    year: "2021",
    frame_size: "55",
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
