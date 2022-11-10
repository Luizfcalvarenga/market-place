# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'json'

case Rails.env

when "production"

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
  urban = Category.create!(name: "urban")
  infant = Category.create!(name: "infant")
  # urban = Category.create!(name: "Urban")

  ##### GENERAL #####
  documentation_type = ["nota_fiscal", "cupom_fiscal_estrangeiro", "documento_importacao", "sem_documentação"]

  categories = [mtb, dirt, road, infant, urban ]


  ################################################################ PRODUCTS #########################################################
  puts "Products types and theis attributtes..."


  ################################## BIKE COMPONENTS

  bike_oriantations = [ "front", "rear", "both"]

  bike_types = [ "no_engine", "electric_engine"]


  battery = ProductType.create(name: "battery")
  brake = ProductType.create(name: "brake")
  brake_levers = ProductType.create(name: "brake_levers")
  cassette = ProductType.create(name: "cassete")
  chain = ProductType.create(name: "chain")
  chainring = ProductType.create(name: "chainring") #coroa
  crankset = ProductType.create(name: "crankset") # pedivela
  fender = ProductType.create(name: "fender")
  frame = ProductType.create(name: "frame")
  front_derailleur = ProductType.create(name: "front_derailleur") #câmbio dianeriro
  front_shifter = ProductType.create(name: "front_shifter")
  front_suspension = ProductType.create(name: "front_suspension")
  full_wheel = ProductType.create(name: "full_wheel")
  grips = ProductType.create(name: "grips")
  handlebar = ProductType.create(name: "handlebar") #caixa de direção
  headset = ProductType.create(name: "headset")
  hub = ProductType.create(name: "hub") # cubo
  pedals = ProductType.create(name: "pedals")
  rim = ProductType.create(name: "rim")
  saddle = ProductType.create(name: "saddle")
  seat_post = ProductType.create(name: "seat_post")
  spoke = ProductType.create(name: "spoke") # raios
  suspension = ProductType.create(name: "suspension") # raios
  rear_derailleur = ProductType.create(name: "rear_derailleur") #câmbio traseiro
  rear_shifter = ProductType.create(name: "rear_shifter")
  rear_suspension = ProductType.create(name: "rear_suspension") # shock
  stem = ProductType.create(name: "stem") # avanço/mesa
  tire = ProductType.create(name: "tire")


  ############################################################### ACCESSORIES

  car_accessories = ProductType.create(name: "car_accessories")
  bike_accessories = ProductType.create(name: "bike_accessories")
  training_accessories = ProductType.create(name: "training_accessories")
  pre_after_pedal_accessories = ProductType.create(name: "pre_after_pedal_accessories")


 ############################################################### CLOTHING

 bretelle = ProductType.create(name: "bretelle")
 shorts = ProductType.create(name: "shorts")
 inner_shorts = ProductType.create(name: "inner_shorts")
 shirt = ProductType.create(name: "shirt")
 vest = ProductType.create(name: "vest")
 windbreaker = ProductType.create(name: "windbreaker")
 gloves = ProductType.create(name: "gloves")
 socks = ProductType.create(name: "socks")
 glasses = ProductType.create(name: "glasses")
 thermal_clothing = ProductType.create(name: "thermal_clothing")

 ############################################################### CASUAL

 cap = ProductType.create(name: "cap")

 ############################################################### EQUIPMENT


 helmet = ProductType.create(name: "helmet")
 elbow_pad = ProductType.create(name: "elbow_pad")
 knee_pad = ProductType.create(name: "knee_pad")
 water_bottle = ProductType.create(name: "water_bottle")
 bottle_cage = ProductType.create(name: "bottle_cage")
 hydration_backpack = ProductType.create(name: "hydration_backpack")
 fanny_pack = ProductType.create(name: "fanny_pack")
 sneaker = ProductType.create(name: "sneaker")



 ############################################################## EQUIPMENT


  air_bomb = ProductType.create(name: "air_bomb")
  lubricant = ProductType.create(name: "lubricant")
  sealant = ProductType.create(name: "sealant")


  products_options = [ battery, brake, brake_levers, cassette, chain, chainring, crankset, fender, frame, front_derailleur, front_shifter, full_wheel, grips, handlebar, headset, hub, pedals, rim, saddle, seat_post, spoke, rear_derailleur, rear_shifter, shock, stem, front_suspension, tire, car_accessories, bike_accessories, training_accessories, pre_after_pedal_accessories, bretelle, shorts, inner_shorts, shirt, vest, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, water_bottle, bottle_cage, hydration_backpack, fanny_pack, sneaker, air_bomb, lubricant, sealant ]




  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLOTHES SIZES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  clothes_sizes = ["PP", "P", "M", "G", "GG", "XGG"]

  bretelle_sizes = ProductTypeAttribute.create!(product_type: bretelle, name: "bretelle_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  shorts_sizes = ProductTypeAttribute.create!(product_type: shorts, name: "shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  inner_shorts_sizes = ProductTypeAttribute.create!(product_type: inner_shorts, name: "inner_shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  shirt_sizes = ProductTypeAttribute.create!(product_type: shirt, name: "shirt_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  windbreaker_sizes = ProductTypeAttribute.create!(product_type: windbreaker, name: "windbreaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  gloves_sizes = ProductTypeAttribute.create!(product_type: gloves, name: "gloves_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  socks_sizes = ProductTypeAttribute.create!(product_type: socks, name: "socks_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  thermal_clothing_sizes = ProductTypeAttribute.create!(product_type: thermal_clothing, name: "thermal_clothing_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  cap_sizes = ProductTypeAttribute.create!(product_type: cap, name: "cap_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")



  shoes_sizes = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, "other"]

  sneaker_sizes = ProductTypeAttribute.create!(product_type: sneaker, name: "sneaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")




  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  frame_brands = [ "alfameq",
    "astro",
    "audax",
    "bH",
    "bianchi",
    "bmc",
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
  shock_sizes = [ "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]


  frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "documentation_type", kind: "multiple_choices", options: documentation_type, prompt: "Documentação?" )
  frame_question_2 = ProductTypeAttribute.create!(product_type: frame, name: "frame_brand", kind: "multiple_choices", options: frame_brands, prompt: "Marca do quadro?" )
  frame_question_3 = ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choices", options: frame_materials, prompt: "Material do quadro?" )
  frame_question_4 = ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choices", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro?")
  frame_question_5 = ProductTypeAttribute.create!(product_type: frame, name: "types_of_suspension", kind: "multiple_choices", options: [ "no_suspension", "hardtail", "full_suspension"], prompt: "Tipo de suspensão?")
  frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho shock?" )
  frame_question_6 = ProductTypeAttribute.create!(product_type: frame, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  frame_questions = [ frame_question_1, frame_question_2, frame_question_3, frame_question_4, frame_question_5, frame_question_6 ]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  brake_types = [ "v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake", "caliper" ]
  road_brake_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  mtb_dirt_urban_brake_models = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "other"]


  brake_question_1 = ProductTypeAttribute.create!(product_type: brake, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  brake_question_2 = ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio?" )
  brake_question_3 = ProductTypeAttribute.create!(product_type: brake, name: "disc_size", kind: "multiple_choice", options: [ "140mm", "160mm", "180mm", "200mm", "203mm", "other" ], prompt: "Tamanho do disco?" )
  brake_question_4 = ProductTypeAttribute.create!(product_type: brake, name: "inclusdes_assessories", kind: "multiple_choice", options: ["Yes", "No"], prompt: "Inclui manetes e capipers?" )
  brake_question_5 = ProductTypeAttribute.create!(product_type: brake, name: "brake_model", kind: "multiple_choices", options: road_brake_models || mtb_dirt_urban_brake_models, prompt: "Modelo?")
  brake_question_6 = ProductTypeAttribute.create!(product_type: brake, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")



  brake_questions = [ brake_question_1, brake_question_2, brake_question_3, brake_question_4, brake_question_5, brake_question_6]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  wheel_sizes = [ "16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]
  rim_materials = [ "aluminum", "carbon", "carbono_alumínio_chainstay", "other"]

  rim_question_1 = ProductTypeAttribute.create!(product_type: rim, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  rim_question_2 = ProductTypeAttribute.create!(product_type: rim, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )
  rim_question_3 = ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: rim_materials, prompt: "Qual material?" )
  rim_question_4 = ProductTypeAttribute.create!(product_type: rim, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  rim_questions = [ rim_question_1, rim_question_2, rim_question_3, rim_question_4 ]

  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HANDLEBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  handlebar_sizes = ["680 mm", "690 mm", "700 mm", "710 mm", "720 mm", "730 mm", "740 mm", "750 mm", "760 mm", "770 mm", "780 mm", "790 mm", "800 mm", "810 mm", "820 mm" "Outro"]

  handlebar_question_1 = ProductTypeAttribute.create!(product_type: handlebar, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  handlebar_question_2 = ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_size", kind: "multiple_choice", options: handlebar_sizes, prompt: "Tamanho?" )
  handlebar_question_3 = ProductTypeAttribute.create!(product_type: handlebar, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  mtb_dirt_urban_front_suspension_models = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]


  front_suspension_question_1 = ProductTypeAttribute.create!(product_type: front_suspension, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  front_suspension_question_2 = ProductTypeAttribute.create!(product_type: front_suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Suspensão dianteira")
  front_suspension_question_3 = ProductTypeAttribute.create!(product_type: front_suspension, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )
  front_suspension_question_4 = ProductTypeAttribute.create!(product_type: front_suspension, name: "model", kind: "multiple_choice", options: mtb_dirt_urban_front_suspension_models, prompt: "Modelo?" )
  front_suspension_question_5 = ProductTypeAttribute.create!(product_type: front_suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")

  front_suspension_questions = [ front_suspension_question_1, front_suspension_question_2, front_suspension_question_3, front_suspension_question_4, front_suspension_question_5]



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  shock_sizes = [ "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  mtb_dirt_urban_front_suspension_models = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]


  rear_suspension_question_1 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Possui documentação?" )
  rear_suspension_question_2 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho shock?" )
  rear_suspension_question_3 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "model", kind: "multiple_choice", options: mtb_dirt_urban_front_suspension_models, prompt: "modelo?" )
  rear_suspension_question_4 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  rear_suspension_questions = [ suspension_question_1, suspension_question_2, suspension_question_3]



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FULL_WHEEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  full_wheel_question_1 = ProductTypeAttribute.create!(product_type: full_wheel, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  full_wheel_question_2 = ProductTypeAttribute.create!(product_type: full_wheel, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SPOKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  spoke_question_1 = ProductTypeAttribute.create!(product_type: spoke, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  spoke_question_2 = ProductTypeAttribute.create!(product_type: spoke, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )





  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  front_gears_options= [ 1, 2, 3 ]
  road_front_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
  mtb_dirt_urban_front_derailleur_models = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]



  front_derailleur_question_1 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  front_derailleur_question_2 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Quantas velocidades?" )
  front_derailleur_question_3 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..40).to_a, prompt: "Relação?" )
  front_derailleur_question_4 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "model", kind: "multiple_choice", options: road_front_derailleur_models ||mtb_dirt_urban_derailleur_models, prompt: "Modelo?" )

  front_derailleur_question_5 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  front_derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3, derailleur_question_3, derailleur_question_4, derailleur_question_5 ]




  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  road_rear_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  mtb_dirt_urban_rear_derailleur_models = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]
  rear_gears_options= [ 1, 7, 8, 9, 10, 11, 12 ]

  rear_derailleur_question_1 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  rear_derailleur_question_2 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: velocity_numbers_options, prompt: "Quantas velocidades?" )
  rear_derailleur_question_3 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..40).to_a, prompt: "Relação?" )
  rear_derailleur_question_4 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "model", kind: "multiple_choice", options: road_rear_derailleur_models || mtb_dirt_urban_rear_derailleur_models, prompt: "Relação?" )
  rear_derailleur_question_4 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  rear_derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3, derailleur_question_4, derailleur_question_5 ]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  seat_post_types = ["retractable", "rigid"]
  seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]

  seat_post_question_1 = ProductTypeAttribute.create!(product_type: seat_post, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  seat_post_question_2 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do canote?" )
  seat_post_question_3 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do canote?" )
  seat_post_question_4 = ProductTypeAttribute.create!(product_type: seat_post, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")

  seat_post_questions = [ seat_post_question_1, seat_post_question_2, seat_post_question_3, seat_post_question_4 ]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  lengths = ["170mm", "172,5mm", "175mm"]
  crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28" ]


  crankset_question_1 = ProductTypeAttribute.create!(product_type: crankset, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  crankset_question_2 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Coroas?" )
  crankset_question_3 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: lengths, prompt: "Comprimento?" )
  crankset_question_4 = ProductTypeAttribute.create!(product_type: crankset, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição?" )

  crankset_questions = [ crankset_question_1, crankset_question_2, crankset_question_3, crankset_question_4 ]

  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]


  battery_question_1 = ProductTypeAttribute.create!(product_type: battery, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  battery_question_2 = ProductTypeAttribute.create!(product_type: battery, name: "battery_capacity", kind: "multiple_choice", options: capacities, prompt: "Capacidade?" )

  battery_question_3 = ProductTypeAttribute.create!(product_type: battery, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição?" )


when "development"
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
  urban = Category.create!(name: "urban")
  infant = Category.create!(name: "infant")

  ##### GENERAL #####
  documentation_type = ["nota_fiscal", "cupom_fiscal_estrangeiro", "documento_importacao", "sem_documentação"]

  categories = [mtb, dirt, road, infant, urban ]


  ################################################################ PRODUCTS #########################################################
  puts "Products types and theis attributtes..."


  ################################## BIKE COMPONENTS

  bike_oriantations = [ "front", "rear", "both"]

  bike_types = [ "no_engine", "electric_engine"]


  battery = ProductType.create(name: "battery")
  brake = ProductType.create(name: "brake")
  brake_levers = ProductType.create(name: "brake_levers")
  cassette = ProductType.create(name: "cassete")
  chain = ProductType.create(name: "chain")
  chainring = ProductType.create(name: "chainring") #coroa
  crankset = ProductType.create(name: "crankset") # pedivela
  fender = ProductType.create(name: "fender")
  frame = ProductType.create(name: "frame")
  front_derailleur = ProductType.create(name: "front_derailleur") #câmbio dianeriro
  front_shifter = ProductType.create(name: "front_shifter")
  front_suspension = ProductType.create(name: "front_suspension")
  full_wheel = ProductType.create(name: "full_wheel")
  grips = ProductType.create(name: "grips")
  handlebar = ProductType.create(name: "handlebar") #caixa de direção
  headset = ProductType.create(name: "headset")
  hub = ProductType.create(name: "hub") # cubo
  pedals = ProductType.create(name: "pedals")
  rim = ProductType.create(name: "rim")
  saddle = ProductType.create(name: "saddle")
  seat_post = ProductType.create(name: "seat_post")
  spoke = ProductType.create(name: "spoke") # raios
  suspension = ProductType.create(name: "suspension") # raios
  rear_derailleur = ProductType.create(name: "rear_derailleur") #câmbio traseiro
  rear_shifter = ProductType.create(name: "rear_shifter")
  rear_suspension = ProductType.create(name: "rear_suspension") # shock
  stem = ProductType.create(name: "stem") # avanço/mesa
  tire = ProductType.create(name: "tire")


  ############################################################### ACCESSORIES

  car_accessories = ProductType.create(name: "car_accessories")
  bike_accessories = ProductType.create(name: "bike_accessories")
  training_accessories = ProductType.create(name: "training_accessories")
  pre_after_pedal_accessories = ProductType.create(name: "pre_after_pedal_accessories")


 ############################################################### CLOTHING

 bretelle = ProductType.create(name: "bretelle")
 shorts = ProductType.create(name: "shorts")
 inner_shorts = ProductType.create(name: "inner_shorts")
 shirt = ProductType.create(name: "shirt")
 vest = ProductType.create(name: "vest")
 windbreaker = ProductType.create(name: "windbreaker")
 gloves = ProductType.create(name: "gloves")
 socks = ProductType.create(name: "socks")
 glasses = ProductType.create(name: "glasses")
 thermal_clothing = ProductType.create(name: "thermal_clothing")

 ############################################################### CASUAL

 cap = ProductType.create(name: "cap")

 ############################################################### EQUIPMENT


 helmet = ProductType.create(name: "helmet")
 elbow_pad = ProductType.create(name: "elbow_pad")
 knee_pad = ProductType.create(name: "knee_pad")
 water_bottle = ProductType.create(name: "water_bottle")
 bottle_cage = ProductType.create(name: "bottle_cage")
 hydration_backpack = ProductType.create(name: "hydration_backpack")
 fanny_pack = ProductType.create(name: "fanny_pack")
 sneaker = ProductType.create(name: "sneaker")



 ############################################################## EQUIPMENT


  air_bomb = ProductType.create(name: "air_bomb")
  lubricant = ProductType.create(name: "lubricant")
  sealant = ProductType.create(name: "sealant")


  products_options = [ battery, brake, brake_levers, cassette, chain, chainring, crankset, fender, frame, front_derailleur, front_shifter, full_wheel, grips, handlebar, headset, hub, pedals, rim, saddle, seat_post, spoke, rear_derailleur, rear_shifter, shock, stem, front_suspension, tire, car_accessories, bike_accessories, training_accessories, pre_after_pedal_accessories, bretelle, shorts, inner_shorts, shirt, vest, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, water_bottle, bottle_cage, hydration_backpack, fanny_pack, sneaker, air_bomb, lubricant, sealant ]




  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLOTHES SIZES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  clothes_sizes = ["PP", "P", "M", "G", "GG", "XGG"]

  bretelle_sizes = ProductTypeAttribute.create!(product_type: bretelle, name: "bretelle_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  shorts_sizes = ProductTypeAttribute.create!(product_type: shorts, name: "shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  inner_shorts_sizes = ProductTypeAttribute.create!(product_type: inner_shorts, name: "inner_shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  shirt_sizes = ProductTypeAttribute.create!(product_type: shirt, name: "shirt_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  windbreaker_sizes = ProductTypeAttribute.create!(product_type: windbreaker, name: "windbreaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  gloves_sizes = ProductTypeAttribute.create!(product_type: gloves, name: "gloves_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  socks_sizes = ProductTypeAttribute.create!(product_type: socks, name: "socks_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  thermal_clothing_sizes = ProductTypeAttribute.create!(product_type: thermal_clothing, name: "thermal_clothing_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")
  cap_sizes = ProductTypeAttribute.create!(product_type: cap, name: "cap_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")



  shoes_sizes = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, "other"]

  sneaker_sizes = ProductTypeAttribute.create!(product_type: sneaker, name: "sneaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho?")




  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  frame_brands = [ "alfameq",
    "astro",
    "audax",
    "bH",
    "bianchi",
    "bmc",
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
  shock_sizes = [ "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]


  frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "documentation_type", kind: "multiple_choices", options: documentation_type, prompt: "Documentação?" )
  frame_question_2 = ProductTypeAttribute.create!(product_type: frame, name: "frame_brand", kind: "multiple_choices", options: frame_brands, prompt: "Marca do quadro?" )
  frame_question_3 = ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choices", options: frame_materials, prompt: "Material do quadro?" )
  frame_question_4 = ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choices", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro?")
  frame_question_5 = ProductTypeAttribute.create!(product_type: frame, name: "types_of_suspension", kind: "multiple_choices", options: [ "no_suspension", "hardtail", "full_suspension"], prompt: "Tipo de suspensão?")
  frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho shock?" )
  frame_question_6 = ProductTypeAttribute.create!(product_type: frame, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  frame_questions = [ frame_question_1, frame_question_2, frame_question_3, frame_question_4, frame_question_5, frame_question_6 ]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  brake_types = [ "v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake", "caliper" ]
  road_brake_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  mtb_dirt_urban_brake_models = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "other"]


  brake_question_1 = ProductTypeAttribute.create!(product_type: brake, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  brake_question_2 = ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio?" )
  brake_question_3 = ProductTypeAttribute.create!(product_type: brake, name: "disc_size", kind: "multiple_choice", options: [ "140mm", "160mm", "180mm", "200mm", "203mm", "other" ], prompt: "Tamanho do disco?" )
  brake_question_4 = ProductTypeAttribute.create!(product_type: brake, name: "inclusdes_assessories", kind: "multiple_choice", options: ["Yes", "No"], prompt: "Inclui manetes e capipers?" )
  brake_question_5 = ProductTypeAttribute.create!(product_type: brake, name: "brake_model", kind: "multiple_choices", options: road_brake_models || mtb_dirt_urban_brake_models, prompt: "Modelo?")
  brake_question_6 = ProductTypeAttribute.create!(product_type: brake, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")



  brake_questions = [ brake_question_1, brake_question_2, brake_question_3, brake_question_4, brake_question_5, brake_question_6]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  wheel_sizes = [ "16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]
  rim_materials = [ "aluminum", "carbon", "carbono_alumínio_chainstay", "other"]

  rim_question_1 = ProductTypeAttribute.create!(product_type: rim, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  rim_question_2 = ProductTypeAttribute.create!(product_type: rim, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )
  rim_question_3 = ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: rim_materials, prompt: "Qual material?" )
  rim_question_4 = ProductTypeAttribute.create!(product_type: rim, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  rim_questions = [ rim_question_1, rim_question_2, rim_question_3, rim_question_4 ]

  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HANDLEBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  handlebar_sizes = ["680 mm", "690 mm", "700 mm", "710 mm", "720 mm", "730 mm", "740 mm", "750 mm", "760 mm", "770 mm", "780 mm", "790 mm", "800 mm", "810 mm", "820 mm" "Outro"]

  handlebar_question_1 = ProductTypeAttribute.create!(product_type: handlebar, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  handlebar_question_2 = ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_size", kind: "multiple_choice", options: handlebar_sizes, prompt: "Tamanho?" )
  handlebar_question_3 = ProductTypeAttribute.create!(product_type: handlebar, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  mtb_dirt_urban_front_suspension_models = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]


  front_suspension_question_1 = ProductTypeAttribute.create!(product_type: front_suspension, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  front_suspension_question_2 = ProductTypeAttribute.create!(product_type: front_suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Suspensão dianteira")
  front_suspension_question_3 = ProductTypeAttribute.create!(product_type: front_suspension, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )
  front_suspension_question_4 = ProductTypeAttribute.create!(product_type: front_suspension, name: "model", kind: "multiple_choice", options: mtb_dirt_urban_front_suspension_models, prompt: "Modelo?" )
  front_suspension_question_5 = ProductTypeAttribute.create!(product_type: front_suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")

  front_suspension_questions = [ front_suspension_question_1, front_suspension_question_2, front_suspension_question_3, front_suspension_question_4, front_suspension_question_5]



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  shock_sizes = [ "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  mtb_dirt_urban_front_suspension_models = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]


  rear_suspension_question_1 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Possui documentação?" )
  rear_suspension_question_2 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho shock?" )
  rear_suspension_question_3 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "model", kind: "multiple_choice", options: mtb_dirt_urban_front_suspension_models, prompt: "modelo?" )
  rear_suspension_question_4 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  rear_suspension_questions = [ suspension_question_1, suspension_question_2, suspension_question_3]



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FULL_WHEEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  full_wheel_question_1 = ProductTypeAttribute.create!(product_type: full_wheel, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  full_wheel_question_2 = ProductTypeAttribute.create!(product_type: full_wheel, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )



  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SPOKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  spoke_question_1 = ProductTypeAttribute.create!(product_type: spoke, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  spoke_question_2 = ProductTypeAttribute.create!(product_type: spoke, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda?" )





  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  front_gears_options= [ 1, 2, 3 ]
  road_front_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
  mtb_dirt_urban_front_derailleur_models = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]



  front_derailleur_question_1 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  front_derailleur_question_2 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Quantas velocidades?" )
  front_derailleur_question_3 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..40).to_a, prompt: "Relação?" )
  front_derailleur_question_4 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "model", kind: "multiple_choice", options: road_front_derailleur_models ||mtb_dirt_urban_derailleur_models, prompt: "Modelo?" )

  front_derailleur_question_5 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  front_derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3, derailleur_question_3, derailleur_question_4, derailleur_question_5 ]




  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  road_rear_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  mtb_dirt_urban_rear_derailleur_models = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]
  rear_gears_options= [ 1, 7, 8, 9, 10, 11, 12 ]

  rear_derailleur_question_1 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  rear_derailleur_question_2 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: velocity_numbers_options, prompt: "Quantas velocidades?" )
  rear_derailleur_question_3 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..40).to_a, prompt: "Relação?" )
  rear_derailleur_question_4 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "model", kind: "multiple_choice", options: road_rear_derailleur_models || mtb_dirt_urban_rear_derailleur_models, prompt: "Relação?" )
  rear_derailleur_question_4 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")


  rear_derailleur_questions = [ derailleur_question_1, derailleur_question_2, derailleur_question_3, derailleur_question_4, derailleur_question_5 ]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  seat_post_types = ["retractable", "rigid"]
  seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]

  seat_post_question_1 = ProductTypeAttribute.create!(product_type: seat_post, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  seat_post_question_2 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do canote?" )
  seat_post_question_3 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do canote?" )
  seat_post_question_4 = ProductTypeAttribute.create!(product_type: seat_post, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição?")

  seat_post_questions = [ seat_post_question_1, seat_post_question_2, seat_post_question_3, seat_post_question_4 ]


  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  lengths = ["170mm", "172,5mm", "175mm"]
  crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28" ]


  crankset_question_1 = ProductTypeAttribute.create!(product_type: crankset, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  crankset_question_2 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Coroas?" )
  crankset_question_3 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: lengths, prompt: "Comprimento?" )
  crankset_question_4 = ProductTypeAttribute.create!(product_type: crankset, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição?" )

  crankset_questions = [ crankset_question_1, crankset_question_2, crankset_question_3, crankset_question_4 ]

  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]


  battery_question_1 = ProductTypeAttribute.create!(product_type: battery, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação?" )
  battery_question_2 = ProductTypeAttribute.create!(product_type: battery, name: "battery_capacity", kind: "multiple_choice", options: capacities, prompt: "Capacidade?" )

  battery_question_3 = ProductTypeAttribute.create!(product_type: battery, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição?" )

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

  opareting_condition = ["rears_worn_out_higher_75", "hifters_not_working_properly", "front_suspension_not_working_properly", "rear_suspension_not_working_properly", "suspensions_lock_not_working_properly", "brake_not_working_properly", "retractable_seat_post_not_working_properly", "creaking_when_pedaling", "wheels_bent", "tyres_worn_out_minus_50"]


  puts "Creating 10 Bikes..."

  10.times do
    category = [mtb, dirt, road].sample

    bike = Bike.create!(
      category_id:  category.id,
      modality: category.modalities.sample,
      bike_type: "No Engine",
      price_in_cents: rand(10000000..22000000),
      quantity: 1,
      locality: ["Belo Horizonte", "Rio de Janeiro", "São Paulo"].sample,
      user_id: (User.ids).sample,
      frame_brand: frame_brands.sample,
      model: ["GTX", "Sense mt-4r", "Oggi predator", "Alfameq trilheiro", "Specialized GTR"].sample,
      year: ["2017", "2018", "2019", "2020", "2021", "2022"].sample,
      frame_size: (road_frame_sizes + mtb_dirt_frame_sizes).sample,
      frame_material: frame_materials.sample,
      rim_size: "19'",
      number_of_front_gears: 1,
      number_of_rear_gears: 16,
      brake_type: brake_types.sample,
      suspension_type: suspension_types.sample,
      front_suspension_travel: front_suspension_travels.sample,
      rear_suspension_travel: rear_suspension_travels.sample,
      seat_post_type: seat_post_types.sample,
      seat_post_travel: seat_post_travels.sample,
      weight: [ 15.0, 16.3, 15.7, 17.4].sample,
      bike_conditions: ["Nova", "Usada"].sample,
      structural_visual_condition: structural_visual_condition.sample,
      operating_condition: opareting_condition.sample,
      documentation_type: ["Nota fiscal", "Documento de importação", "Cupom Fiscal Estrangeiro"].sample,
      description: "Bicicleta em perfeito estado apenas 1 dono.",
      accessories: false
    )
  end
  puts "Seed finished"
end
