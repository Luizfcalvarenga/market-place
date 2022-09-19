# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'
################################################################ USERS ################################################################
buyer = User.create!(email: "user@app.com", password: "123456" )
seller = User.create!(email: "test@app.com", password: "123456" )
bike_user = User.create!(email: "bike@app.com", password: "123456" )



################################################################ BIKES_CTEGORIES ################################################################

mtb = Category.create(name: "Mountain Bike", modalities: '["Downhill", "Enduro", "Gravel", "Speed", "Trail", "XC (Cross Country)"]')
dirt = Category.create(name: "Dirt/Street", modalities: '["Street BMX", "Race BMX", "BIig Wheel BMX", "Dirt Jump", "Trail", "XC (Cross Country)"]')
road = Category.create(name: "Road", modalities: '["Speed / Performance", "Triathlon", "Ciclocross", "Cicloviagem", "Gravel"]')

categories = [mtb, dirt, road]


################################################################ BIKES_COMPONENTS ################################################################
bike_oriantation = [ "Front", "Rear", "Both"]

brake = ComponentType.create(name: "Breake")
frame = ComponentType.create(name: "Frame")
suspension = ComponentType.create(name: "Suspension")
seat_post = ComponentType.create(name: "Seat Post")
rim = ComponentType.create(name: "Rim")
saddle = ComponentType.create(name: "Saddle")
shock = ComponentType.create(name: "Shock")
handlebar = ComponentType.create(name: "Handlebar")
crankset = ComponentType.create(name: "Crankset")
shifters = ComponentType.create(name: "Shifters")
stem = ComponentType.create(name: "Stem")
pedals = ComponentType.create(name: "Pedals")
derailleur = ComponentType.create(name: "Derailleur")
grips = ComponentType.create(name: "Grips")
headset = ComponentType.create(name: "Headset")

components_options = [ brake, frame, suspension, seat_post, rim, saddle, shock, handlebar, crankset, shifters, stem, pedals, derailleur, grips, headset ]

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
brake_question_2 = ComponentTypeAttribute.create!(component_type: brake, name: "number_of_pistons", kind: "options", options: [ 2, 4], prompt: "Quantos pistões?" )
brake_question_3 = ComponentTypeAttribute.create!(component_type: brake, name: "number_of_disc", kind: "options", options: [ "Front and rear", "Isolated"], prompt: "Quantos discos?" )
brake_question_4 = ComponentTypeAttribute.create!(component_type: brake, name: "disc-size", kind: "options", options: [ "120mm", "140mm", "160mm", "180mm", "200mm", "203mm" ], prompt: "Tamanho do disco?" )
brake_question_5 = ComponentTypeAttribute.create!(component_type: brake, name: "inclusdes_assessories", kind: "options", options: ["Yes", "No"], prompt: "Inclui manetes e capipers?" )

brake_questions = [ brake_question_1, brake_question_2, brake_question_3, brake_question_4, brake_question_5 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

rim_sizes = [ "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]
rim_materials = [ "Alumínio","Carbono", "Carbono / Alumínio (chainstay)", "Outro"]


rim_question_1 = ComponentTypeAttribute.create!(component_type: rim, name: "rim_size", kind: "options", options: rim_sizes, prompt: "Tamanho?" )
rim_question_2 = ComponentTypeAttribute.create!(component_type: rim, name: "rim_holes", kind: "options", options: (1..5), prompt: "Quantos furos?" )
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

derailleur_question_1 = ComponentTypeAttribute.create!(component_type: derailleur, name: "derailleur_number", kind: "options", options: bike_oriantation, prompt: "Tipo de câmbio?" )
derailleur_question_2 = ComponentTypeAttribute.create!(component_type: derailleur, name: "derailleur_velocities", kind: "options", options: velocity_numbers_options, prompt: "Quantas velocidades?" )
derailleur_question_3 = ComponentTypeAttribute.create!(component_type: derailleur, name: "derailleur_teeth", kind: "options", options: (1..40), prompt: "Relação?" )

derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

seat_post_types = ["Retractable", "Rigid"]
seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm" ]


seat_post_question_1 = ComponentTypeAttribute.create!(component_type: seat_post, name: "seat_post_type", kind: "options", options: seat_post_types, prompt: "Tipo do canote?" )
seat_post_question_2 = ComponentTypeAttribute.create!(component_type: seat_post, name: "seat_post_travel", kind: "options", options: seat_post_travels, prompt: "Curso do canote?" )

seat_post_questions = [ seat_post_question_1, seat_post_question_2 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COMPONENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

5.times do
  user = [buyer, seller, bike_user].sample
  category = categories.sample

  component = Component.create!(user: user,
    category: category,
    modality: JSON[category.modalities].sample,
    component_type: components_options.sample,
    name: "Peça em bom estado",
    description: "Único dono com funcinamento perfeito",
    price_in_cents: rand(10000..50000)

  )

  # component_attribute_1 = ComponentAttribute.create!(component: component, component_type_attribute: component.component_type)
  # component_attribute_2 = ComponentAttribute.create!(component: suspension, component_type_attribute: suspension_question_2, value: "Full Suspension (suspensão dianteira e traseira)")
  # component_attribute_3 = ComponentAttribute.create!(component: suspension, component_type_attribute: suspension_question_3, value: "100 mm")
  # component_attribute_4 = ComponentAttribute.create!(component: suspension, component_type_attribute: suspension_question_4, value: "120 mm")
  # component_attribute_5 = ComponentAttribute.create!(component: suspension, component_type_attribute: suspension_question_5, value: "24''")
end


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BIKES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


5.times do
  # user = [buyer, seller, bike_user].sample
  category = [mtb, dirt, road].sample

  bike = Bike.create!(
    category:  category,
    modality: JSON[category.modalities].sample,
    price_in_cents: rand(10000000..22000000),
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
    seat_post_type: "Retátil",
    seat_post_travel: "100 mm",
    weight: [ 15.0, 16.3, 15.7, 17.4].sample,
    bike_conditions: "Usada",
    structural_visual_condition: "Apresenta pequenos riscos ou arranhões superficiais",
    opareting_condition: "Funcionamento perfeito, sem necessidade de ajustes ou substituição de peças",
    documentation: "Nota fiscal",
    description: "Bicicleta em perfeito estado apenas 1 dono.",
    accessories: false
  )
end
