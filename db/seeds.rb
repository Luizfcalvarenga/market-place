# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'json'

puts "Starting seed..."

################################################################ SERVICES ################################################################

standart_ad = Service.create!(name: "standart_ad", description: "standart_ad_with_no_views_privileges", price_in_cents: 2990)
gold_ad = Service.create!(name: "gold_ad", description: "gold_ad_with_some_views_privileges", price_in_cents: 3990)
platinum_ad = Service.create!(name: "platinum_ad", description: "platinum_ad_with_total_views_privileges", price_in_cents: 4990)


################################################################ CATEGORIES ################################################################

##### BIKES #####

mtb = Category.create!(name: "mountain_bike", modalities: ["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country"])
dirt = Category.create!(name: "dirt_street", modalities: ["street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"])
road = Category.create!(name: "road", modalities: ["speed_performance", "triathlon", "ciclocross", "cicloviagem", "gravel"])
other = Category.create!(name: "other")
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



brake = ProductType.create(name: "brake") #
bottle_cage = ProductType.create(name: "bottle_cage") #
cassette = ProductType.create(name: "cassete")
chain = ProductType.create(name: "chain")
chainring = ProductType.create(name: "chainring")
crankset = ProductType.create(name: "crankset")
derailleur = ProductType.create(name: "derailleur")
fender = ProductType.create(name: "fender")
frame = ProductType.create(name: "frame")
grips = ProductType.create(name: "grips")
handlebar = ProductType.create(name: "handlebar")
headset = ProductType.create(name: "headset")
hub = ProductType.create(name: "hub")
pedals = ProductType.create(name: "pedals")
rim = ProductType.create(name: "rim")
saddle = ProductType.create(name: "saddle")
seat_post = ProductType.create(name: "seat_post")
shifters = ProductType.create(name: "shifters")
shock = ProductType.create(name: "shock")
stem = ProductType.create(name: "stem")
suspension = ProductType.create(name: "suspension")
tire = ProductType.create(name: "tire")

############################################################### OTHER PRODUCTS

accessories = ProductType.create(name: "accessories")
clothing = ProductType.create(name: "clothing")
kids = ProductType.create(name: "kids")
equipament = ProductType.create(name: "equipament")



products_options = [ brake, bottle_cage, cassette, chain, chainring, crankset, derailleur, fender, frame, grips, handlebar, headset, hub, pedals, rim, saddle, seat_post, shifters, shock, stem, suspension, tire, accessories, clothing, kids, equipament ]

#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

frame_brands = [ "alfameq",
  "astro",
  "audax",
  "bH",
  "bianchi",
  "bMC",
  "caloi",
  "cannondale",
  "canyon",
  "carrera",
  "cervelo",
  "corratec",
  "cube",
  "dabomb",
  "felt",
  "first",
  "focus",
  "fuji",
  "giant",
  "groove",
  "gT",
  "gTS",
  "ibis",
  "jamis",
  "kona",
  "lapierre",
  "marin",
  "merida",
  "mosso",
  "oggi",
  "orbea",
  "pinarello",
  "raleigh",
  "rava",
  "ridley",
  "santa_cruz",
  "schwinn",
  "scott",
  "sense",
  "soul",
  "specialized",
  "swift Carbon",
  "trek",
  "tsw",
  "wilier",
  "yt",
  "argon_21",
  "bliv",
  "blue",
  "bottecchia",
  "cipollini",
  "cly",
  "cumberland",
  "de_rosa",
  "e_moving",
  "gary_fisher",
  "gioia",
  "kaiena",
  "kestrel",
  "kode",
  "kuota",
  "lazzaretti",
  "lev_e_bike",
  "litespeed",
  "look",
  "lotus",
  "mercian",
  "miyamura Gravel",
  "open",
  "quintana_roo",
  "redland",
  "riva",
  "rose",
  "sava",
  "sundown",
  "time",
  "trinx",
  "trust",
  "velorbis",
  "vicinitech",
  "victory",
  "eddy_merckx",
  "salsa",
  "surly",
  "soma",
  "diamondback",
  "dahon",
  "other"
].sort_by { |frame_brands| frame_brands }


road_frame_sizes = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
mtb_dirt_frame_sizes = [  "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]

frame_materials = [ "aluminum ", "carbon", "carbon_aluminum_chainstay", "other"]

frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "documentation_type", kind: "multiple_choices", options: ["Yes", "No"], prompt: "Possui documentação?" )
frame_question_2 = ProductTypeAttribute.create!(product_type: frame, name: "frame_brand", kind: "multiple_choices", options: frame_brands, prompt: "Marca do quadro?" )
frame_question_3 = ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choices", options: frame_materials, prompt: "Material do quadro?" )
frame_question_4 = ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choices", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro?")
frame_question_5 = ProductTypeAttribute.create!(product_type: frame, name: "types_of_rim", kind: "multiple_choices", options: [16, 20, 26, 27.5, 29, 650, 700], prompt: "Compatibilidade de aro?")
frame_question_6 = ProductTypeAttribute.create!(product_type: frame, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


frame_questions = [ frame_question_1, frame_question_2, frame_question_3, frame_question_4, frame_question_5, frame_question_6 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

brake_types = [ "v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake", "caliper" ]

brake_question_1 = ProductTypeAttribute.create!(product_type: brake, name: "documentation_type", kind: "multiple_choice", options: ["Yes", "No"], prompt: "Possui documentação?" )
brake_question_2 = ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio?" )
brake_question_3 = ProductTypeAttribute.create!(product_type: brake, name: "number_of_pistons", kind: "multiple_choice", options: [ 2, 4], prompt: "Quantos pistões?" )
brake_question_4 = ProductTypeAttribute.create!(product_type: brake, name: "number_of_disc", kind: "multiple_choice", options: [ "Front and rear", "Isolated"], prompt: "Quantos discos?" )
brake_question_5 = ProductTypeAttribute.create!(product_type: brake, name: "disc_size", kind: "multiple_choice", options: [ "120mm", "140mm", "160mm", "180mm", "200mm", "203mm" ], prompt: "Tamanho do disco?" )
brake_question_6 = ProductTypeAttribute.create!(product_type: brake, name: "inclusdes_assessories", kind: "multiple_choice", options: ["Yes", "No"], prompt: "Inclui manetes e capipers?" )
brake_question_7 = ProductTypeAttribute.create!(product_type: brake, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


brake_questions = [ brake_question_1, brake_question_2, brake_question_3, brake_question_4, brake_question_5, brake_question_6, brake_question_7 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

rim_sizes = [ "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]
rim_materials = [ "aluminum", "carbon", "carbono_alumínio_chainstay", "other"]
rim_brake_types = ["disc_6_holes", "disc_center_lock", "rim_brake"]

rim_question_1 = ProductTypeAttribute.create!(product_type: rim, name: "rim_size", kind: "multiple_choice", options: rim_sizes, prompt: "Tamanho?" )
rim_question_2 = ProductTypeAttribute.create!(product_type: rim, name: "rim_brake", kind: "multiple_choice", options: rim_brake_types, prompt: "Tipo de freio?" )
rim_question_3 = ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: rim_materials, prompt: "Qual material?" )
rim_question_4 = ProductTypeAttribute.create!(product_type: rim, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


rim_questions = [ rim_question_1, rim_question_2, rim_question_3, rim_question_4 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


suspension_types = [ "no_suspension", "hardtail", "full_suspension"]
front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "Outro"]
rear_suspension_travels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "Outro"]

suspension_question_1 = ProductTypeAttribute.create!(product_type: suspension, name: "documentation_type", kind: "multiple_choice", options: ["Sim", "Não"], prompt: "Possui documentação?" )
suspension_question_2 = ProductTypeAttribute.create!(product_type: suspension, name: "suspension_type", kind: "multiple_choice", options: suspension_types, prompt: "Tipo de suspenção?" )
suspension_question_3 = ProductTypeAttribute.create!(product_type: suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Suspensão dianteira")
suspension_question_4 = ProductTypeAttribute.create!(product_type: suspension, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Suspensão traseira")
suspension_question_5 = ProductTypeAttribute.create!(product_type: suspension, name: "rim_size", kind: "multiple_choice", options: rim_sizes, prompt: "Tamanho do aro?" )
suspension_question_6 = ProductTypeAttribute.create!(product_type: suspension, name: "axle_type", kind: "multiple_choice", options: ["15mm", "20mm", "normal"], prompt: "Tipo de eixo?" )
suspension_question_7 = ProductTypeAttribute.create!(product_type: suspension, name: "axle_compability", kind: "multiple_choice", options: ["boost", "non_boost"], prompt: "Compatibilidade de eixo?" )

suspension_question_8 = ProductTypeAttribute.create!(product_type: suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


suspension_questions = [ suspension_question_1, suspension_question_2, suspension_question_3, suspension_question_4, suspension_question_5, suspension_question_6, suspension_question_7, suspension_question_8 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SHOCK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

shock_sizes = [ "100mm", "120mm", "130mm", "140mm", "150mm", "160mm", "165mm", "180mm", "200mm" ]


shock_question_1 = ProductTypeAttribute.create!(product_type: shock, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho?" )
shock_question_2 = ProductTypeAttribute.create!(product_type: shock, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")



#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


velocity_numbers_options= [ 1, 2, 3, 7, 8, 9, 10, 11, 12 ]

derailleur_question_1 = ProductTypeAttribute.create!(product_type: derailleur, name: "derailleur_number", kind: "multiple_choice", options: bike_oriantations, prompt: "Tipo de câmbio?" )
derailleur_question_2 = ProductTypeAttribute.create!(product_type: derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: velocity_numbers_options, prompt: "Quantas velocidades?" )
derailleur_question_3 = ProductTypeAttribute.create!(product_type: derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..40).to_a, prompt: "Relação?" )
derailleur_question_4 = ProductTypeAttribute.create!(product_type: derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3, derailleur_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


seat_post_types = ["retractable", "rigid"]
seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm" ]


seat_post_question_1 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do canote?" )
seat_post_question_2 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do canote?" )
seat_post_question_3 = ProductTypeAttribute.create!(product_type: seat_post, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")

seat_post_questions = [ seat_post_question_1, seat_post_question_2, seat_post_question_3 ]


#<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


length = ["170mm", "172,5mm", "175mm"]
crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28" ]


crankset_question_1 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Coroas?" )
crankset_question_2 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: length, prompt: "Comprimento?" )
crankset_question_3 = ProductTypeAttribute.create!(product_type: crankset, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição?" )

crankset_questions = [ crankset_question_1, crankset_question_2, crankset_question_3 ]

# Battery not sold separately **
if Rails.env.development?
  ################################################################ USERS ################################################################
  buyer = User.create!(email: "user@app.com", password: "123456" )
  seller = User.create!(email: "test@app.com", password: "123456" )
  bike_user = User.create!(email: "bike@app.com", password: "123456" )

  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COMPONENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COMPONENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  puts "Creating 10 Products and their products attributes..."

  10.times do
    user = [buyer, seller, bike_user].sample
    category = categories.sample

    product = Product.create!(user: user,
      category: category,
      modality: category.modalities.sample,
      product_type: products_options.sample,
      brand: ["nuflow", "damatta", "nomad"].sample,
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

  structural_visual_condition = ["perfect_condition", "minor_surface_scratches", "spalls_in_paint", "painted_frame", "frame_welded_repaired", "frame_cracks_or_fissures_must_be_repaired", "components_welded_repaired", "components_cracks_or_fissures_must_be_repaired" ]

  opareting_condition = ["rears_worn_out_higher_75", "hifters-not_working_properly", "front_suspension_not_working_properly", "rear_suspension_not_working_properly", "suspensions_lock_not_working_properly", "brake_not_working_properly", "retractable_seat_post_not_working_properly", "creaking_when_pedaling", "wheels_bent", "tyres_worn_out_minus_50"]


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
end
