  # rim_question_2 = ProductTypeAttribute.create!(product_type: rim, name: "rim_brake", kind: "multiple_choice", options: rim_brake_types, prompt: "Tipo de freio" )




  # This file should contain all the record creation needed to seed the database with its default values.
  # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
  #
  # Examples:
  #
  #   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
  #   Character.create(name: 'Luke', movie: movies.first)


  require 'json'
  require Rails.root.join('db/seeds/states_and_cities_populate')


  case Rails.env

  when "production"

    puts "Starting seed..."


    puts "Criando lista de estados e cidades..."
    StatesAndCitiesPopulate.populate!
    puts "-- OK!"
    ################################################################ CATEGORIES ################################################################
    ##### BIKES #####
    mtb = Category.create!(name: "mountain_bike", modalities: ["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country"])
    dirt = Category.create!(name: "dirt_street", modalities: ["street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"])
    road = Category.create!(name: "road", modalities: ["speed_performance", "triathlon", "ciclocross", "cicloviagem", "gravel"])
    urban = Category.create!(name: "urban", modalities: ["urban"])
    infant = Category.create!(name: "infant", modalities: ["infant"])

    ##### GENERAL #####
    documentation_type = ["receipt", "import_document", "foreign_tax_coupon", "no_documentation"]


    categories = [mtb, dirt, road, infant, urban ]

    puts "Starting deliting what don't need..."


    ################################################################ PRODUCTS #########################################################
    puts "Products types and theis attributtes..."

    ################################## BIKE COMPONENTS
    bike_oriantations = [ "front", "rear", "both"]

    bike_types = ["bike", "e-bike"]


    adapters = ProductType.create(name: "adapters", prompt: "Adaptadores")
    battery = ProductType.create(name: "battery", prompt: "Bateria")
    blocking = ProductType.create(name: "blocking", prompt: "Blocagem")
    bearing = ProductType.create(name: "bearing", prompt: "Rolamento")
    brake = ProductType.create(name: "brake", prompt: "Freio")
    brake_disc = ProductType.create(name: "brake_disc", prompt: "Disco de Freio")
    brake_levers = ProductType.create(name: "brake_levers", prompt: "Manete de Freio")
    brake_pad = ProductType.create(name: "brake_pad", prompt: "Pastilha de Freio")
    bottle_cage = ProductType.create(name: "bottle_cage", prompt: "Suporte para Garrafa")
    cassete = ProductType.create(name: "cassete", prompt: "Cassete")
    central_movement = ProductType.create(name: "central_movement", prompt: "Movimento Central")
    chain = ProductType.create(name: "chain", prompt: "Corrente")
    chain_guide = ProductType.create(name: "chain_guide", prompt: "Guia de Corrente")
    chainring = ProductType.create(name: "chainring", prompt: "Coroa")
    relation_kit_complete_group = ProductType.create(name: "relation_kit_complete_group", prompt: "Kit Relação/Grupo Completo")
    crankset = ProductType.create(name: "crankset", prompt: "Pedivela")
    fender = ProductType.create(name: "fender", prompt: "Para-lama")
    frame = ProductType.create(name: "frame", prompt: "Quadro")
    front_derailleur = ProductType.create(name: "front_derailleur", prompt: "Câmbio Dianteiro")
    front_shifter = ProductType.create(name: "front_shifter", prompt: "Trocador/Passador Dianteiro")
    front_suspension = ProductType.create(name: "front_suspension", prompt: "Suspensão Dianteira")
    front_fork = ProductType.create(name: "front_fork", prompt: "Garfo")
    wheel = ProductType.create(name: "wheel", prompt: "Roda")
    grips = ProductType.create(name: "grips", prompt: "Punho/Manopla")
    handlebar = ProductType.create(name: "handlebar", prompt: "Guidão")
    headset = ProductType.create(name: "headset", prompt: "Caixa de Direção")
    hub = ProductType.create(name: "hub", prompt: "Cubo")
    hanger = ProductType.create(name: "hanger", prompt: "Gancheira")
    pedal = ProductType.create(name: "pedal", prompt: "Pedal")
    power_meter = ProductType.create(name: "power_meter", prompt: "Medidor de Potência")
    rim = ProductType.create(name: "rim", prompt: "Aro")
    saddle = ProductType.create(name: "saddle", prompt: "Selim/Banco")
    seat_post = ProductType.create(name: "seat_post", prompt: "Canote")
    sheave = ProductType.create(name: "sheave", prompt: "Roldana")
    rear_derailleur = ProductType.create(name: "rear_derailleur", prompt: "Câmbio Traseiro")
    rear_shifter = ProductType.create(name: "rear_shifter", prompt: "Trocador/Passador Traseiro")
    rear_suspension = ProductType.create(name: "rear_suspension", prompt: "Shock/Suspensão Traseira")
    stem = ProductType.create(name: "stem", prompt: "Avanço/Mesa")
    tube = ProductType.create(name: "tube", prompt: "Câmara")
    tyre = ProductType.create(name: "tyre", prompt: "Pneu")


    ############################################################### ACCESSORIES

    air_bomb = ProductType.create(name: "air_bomb", prompt: "Bomba de Ar")
    eletronics = ProductType.create(name: "eletronics", prompt: "Eletrônicos")
    oil_lubricant = ProductType.create(name: "oil_lubricant", prompt: "Óleos e Lubrificantes")
    stand = ProductType.create(name: "stand", prompt: "Cavaletes")
    tools = ProductType.create(name: "tools", prompt: "Ferramentas")
    car_protectors = ProductType.create(name: "car_protectors", prompt: "Protetores para Carros")
    training_roller = ProductType.create(name: "training_roller", prompt: "Rolo de Treino")
    bike_rack = ProductType.create(name: "bike_rack", prompt: "Suportes para Carro")
    water_bottle = ProductType.create(name: "water_bottle", prompt: "Garrafa")


    ############################################################### CLOTHING

    bretelle = ProductType.create(name: "bretelle", prompt: "Bretelle")
    shorts = ProductType.create(name: "shorts", prompt: "Bermuda")
    inner_shorts = ProductType.create(name: "inner_shorts", prompt: "Bermuda Interior")
    shirt = ProductType.create(name: "shirt", prompt: "Camisa")
    pants = ProductType.create(name: "pants", prompt: "Calça")
    vest = ProductType.create(name: "vest", prompt: "Colete")
    coat = ProductType.create(name: "coat", prompt: "Casaco")
    windbreaker = ProductType.create(name: "windbreaker", prompt: "Corta Vento")
    gloves = ProductType.create(name: "gloves", prompt: "Luvas")
    socks = ProductType.create(name: "socks", prompt: "Meias")
    glasses = ProductType.create(name: "glasses", prompt: "Óculos")
    thermal_clothing = ProductType.create(name: "thermal_clothing", prompt: "Roupa Térmica")
    cap = ProductType.create(name: "cap", prompt: "Boné")
    helmet = ProductType.create(name: "helmet", prompt: "Capacete")
    elbow_pad = ProductType.create(name: "elbow_pad", prompt: "Cotoveleira")
    knee_pad = ProductType.create(name: "knee_pad", prompt: "Joelheira")
    hydration_pack = ProductType.create(name: "hydration_pack", prompt: "Mochila de Hidratação")
    fanny_pack = ProductType.create(name: "fanny_pack", prompt: "Pochete")
    sneaker = ProductType.create(name: "sneaker", prompt: "Sapatilha")

    # products_options = [adapters, battery, blocking, bearing, brake, brake_levers, brake_pad, bottle_cage, cassete, central_movement, chain, chain_guide, chainring, relation_kit_complete_group, crankset, fender, frame, front_derailleur, rear_derailleur, front_shifter, front_suspension, wheel, grips, handlebar, headset, hub, hanger, pedals, power_meter, rim, saddle, seat_post, sheave, spoke, rear_shifter, rear_suspension, stem, tube, tyre, air_bomb, eletronics, oil_lubricant, stand, tools, car_protector, training_roller, bike_rack, bretelle, shorts, inner_shorts, shirt, pants, vest, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, water_bottle, hydration_pack, fanny_pack, sneaker ]

    clothes_sizes = ["PP", "P", "M", "G", "GG", "XGG", "Único"]
    bretelle_sizes = ProductTypeAttribute.create!(product_type: bretelle, name: "bretelle_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    shorts_sizes = ProductTypeAttribute.create!(product_type: shorts, name: "shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    inner_shorts_sizes = ProductTypeAttribute.create!(product_type: inner_shorts, name: "inner_shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    shirt_sizes = ProductTypeAttribute.create!(product_type: shirt, name: "shirt_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    vest_sizes = ProductTypeAttribute.create!(product_type: vest, name: "vest_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    windbreaker_sizes = ProductTypeAttribute.create!(product_type: windbreaker, name: "windbreaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    gloves_sizes = ProductTypeAttribute.create!(product_type: gloves, name: "gloves_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    thermal_clothing_sizes = ProductTypeAttribute.create!(product_type: thermal_clothing, name: "thermal_clothing_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    cap_sizes = ProductTypeAttribute.create!(product_type: cap, name: "cap_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    pants_sizes = ProductTypeAttribute.create!(product_type: pants, name: "pants_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    helmet_sizes = ProductTypeAttribute.create!(product_type: helmet, name: "helmet_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    elbow_pad_sizes = ProductTypeAttribute.create!(product_type: elbow_pad, name: "elbow_pad_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    knee_pad_sizes = ProductTypeAttribute.create!(product_type: knee_pad, name: "knee_pad_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    coat_sizes = ProductTypeAttribute.create!(product_type: coat, name: "coat_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    hydration_pack_sizes = ProductTypeAttribute.create!(product_type: hydration_pack, name: "hydration_pack_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    glasses_sizes = ProductTypeAttribute.create!(product_type: glasses, name: "glasses_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    fanny_pack_sizes = ProductTypeAttribute.create!(product_type: fanny_pack, name: "fanny_pack_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    shoes_sizes = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, "other"]
    socks_sizes = ProductTypeAttribute.create!(product_type: socks, name: "socks_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")
    sneaker_sizes = ProductTypeAttribute.create!(product_type: sneaker, name: "sneaker_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")


    materials = [ ["aluminum", "Alumínio" ], ["carbon", "Carbono"], ["carbon_aluminum_chainstay", "Carbono/Aumínio (Chainstay)" ], ["other", "Outro" ]]

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    frame_brands = [ "Alfameq", "Astro", "Audax", "BH", "Bianchi", "BMC", "Caloi", "Cannondale", "Canyon", "Carrera", "Cervelo", "Corratec", "Cube", "dabomb", "Felt", "First", "Focus", "Fuji", "Giant", "Groove", "GT", "GTS", "Ibis", "Jamis", "Kona", "Lapierre", "Marin", "Merida", "Mosso", "Oggi", "Orbea", "Pinarello", "Raleigh", "Rava", "Ridley", "Santa_cruz", "Schwinn", "Scott", "Sense", "Soul", "Specialized", "Swift Carbon", "Trek", "Tsw", "Wilier", "YT", "Argon 21", "Bliv", "Blue", "Bottecchia", "Cipollini", "Cly", "Cumberland", "De Rosa", "E Moving", "Gary Fisher", "Gioia", "Kaiena", "Kestrel", "Kode", "Kuota", "Lazzaretti", "L E-Bike", "Litespeed", "Look", "Lotus", "Mercian", "Miyamura Gravel", "Open", "Quintana Roo", "Redland", "Riva", "Rose", "Sava", "Sundown", "Time", "Trinx", "Trust", "Velorbis", "Vicinitech", "Victory", "Eddy Merckx", "Salsa", "Surly", "Soma", "Diamondback", "Dahon", "Yeti", "other"
    ].sort_by { |frame_brands| frame_brands }

    road_frame_sizes = ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
    mtb_dirt_frame_sizes = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "S1", "S2", "S3", "S4", "S5", "S6", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
    rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
    shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
    battery_capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]
    ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choice", options: materials, prompt: "Material do quadro" )
    ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choice", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro")
    ProductTypeAttribute.create!(product_type: frame, name: "suspension_type", kind: "multiple_choice", options: [["no_suspension", "Sem Suspensão"], ["hardtail", "Hardtail" ], ["full_suspension", "Full Suspension" ]], prompt: "Tipo de suspensão")
    ProductTypeAttribute.create!(product_type: frame, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso da suspensão traseira")
    ProductTypeAttribute.create!(product_type: frame, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Medida do shock") # caso possam ser opcionais os atributos
    ProductTypeAttribute.create!(product_type: frame, name: "bike_type", kind: "multiple_choice", options: ["Bike", "E-Bike"], prompt: "Tipo de bike")
    ProductTypeAttribute.create!(product_type: frame, name: "battery_capacity", kind: "multiple_choice", options: battery_capacities, prompt: "Capacidade da bateria") # se for e-bike
    ProductTypeAttribute.create!(product_type: frame, name: "battery_cycles", kind: "text", options: nil, prompt: "Ciclos da bateria") # se for e-bike ?? option nil ?
    ProductTypeAttribute.create!(product_type: frame, name: "motor_mileage", kind: "text", options: "", prompt: "KM do motor") # se for e-bike ???? option "" ?


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    # road_brake_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "Outro"]
    # mtb_dirt_urban_brake_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "Outro"]
    brake_types = [["v_brake", "V-Brake"], ["hydraulic_disc", "À Disco Hidraulico" ], ["mechanical_disc", "À Disco Mecânico" ], ["coaster_brake", "Contra Pedal" ]]
    ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio" )
    ProductTypeAttribute.create!(product_type: brake, name: "disc_include", kind: "multiple_choice", options: ["Sim", "Não"], prompt: "Acompanha Disco?") # se for hidraulico ou mecanico à disco
    ProductTypeAttribute.create!(product_type: brake, name: "brake_disc_size", kind: "multiple_choice", options: ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ], prompt: "Tamanho do disco")  # se acompanhar disco

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    wheel_sizes = ["16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]
    ProductTypeAttribute.create!(product_type: rim, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")
    ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: materials, prompt: "Material")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HANDLEBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    handlebar_sizes_mtb_dirt_urban_infant = ["660 mm","680 mm", "690 mm", "700 mm", "710 mm", "720 mm", "730 mm", "740 mm", "750 mm", "760 mm", "770 mm", "780 mm", "790 mm", "800 mm", "810 mm", "820 mm", "other"]
    handlebar_sizes_road = ["360 mm", "380 mm", "400 mm", "420 mm", "440 mm", "460 mm", "other"]
    handlebar_diameters = ["25,4 mm", "31,8 mm", "other"]
    handlebar_drops = ["130 mm", "140 mm", "150mm", "160mm", "other"]
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_size", kind: "multiple_choice", options: handlebar_sizes_mtb_dirt_urban_infant || handlebar_sizes_road, prompt: "Tamanho" ) # opçõs de acordo com categoria #???
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_diameter", kind: "multiple_choice", options: handlebar_diameters, prompt: "Diâmetro") #???
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_drop", kind: "multiple_choice", options: handlebar_drops, prompt: "Drop") #??? perguntar se for categoria road
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_material", kind: "multiple_choice", options: materials, prompt: "Material") #???


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    front_suspension_travels = ["80mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
    # mtb_dirt_urban_front_suspension_models = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "FOX 30", "FOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]
    ProductTypeAttribute.create!(product_type: front_suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Curso da suspensão dianteira")
    ProductTypeAttribute.create!(product_type: front_suspension, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
    # rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
    # mtb_dirt_urban_rear_suspension_models = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "ROCKSHOX VIVID", "other"]
    ProductTypeAttribute.create!(product_type: rear_suspension, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Medida do Shock")
    # ProductTypeAttribute.create!(product_type: rear_suspension, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso da supensão traseira" )

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< WHEEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    ProductTypeAttribute.create!(product_type: wheel, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")
    ProductTypeAttribute.create!(product_type: wheel, name: "wheel_material", kind: "multiple_choice", options: materials, prompt: "Material da roda")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RELATION KIT/COMPLETE GROUP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    front_gears_options= [0, 1, 2, 3 ]
    rear_gears_options= [0, 1, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "rear_or_front_and_rear_derailleur", kind: "multiple_choice", options: [["front_and_rear", "Dianteira e Traseira"], ["rear", "Traseira"]], prompt: "Tipo de relação")
    ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "front_derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas (dianteiro)") #condicionada ao tipo
    ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "rear_derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de velocidades (traseiro)")  #condicionada ao tipo

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    # road_front_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
    # mtb_dirt_urban_front_derailleur_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]
    front_gears_options= [0, 1, 2, 3 ]
    ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas")


    # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    # road_rear_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
    # mtb_dirt_urban_rear_derailleur_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]
    rear_gears_options = [0, 1, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: (1..12).to_a, prompt: "Número de velocidades")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    seat_post_types = [["retractable", "Retrátil"], ["rigid", "Rígido"]]
    seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]
    seat_post_diameter = ["25.4mm", "27.2 mm", "30.9mm", "31.6mm", "34.9mm", "other" ]
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do Canote")
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do Canote")
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_material", kind: "multiple_choice", options: materials, prompt: "Material") # só rígido
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_diameter", kind: "multiple_choice", options: seat_post_diameter, prompt: "Diâmetro")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    lengths = ["170mm", "172,5mm", "175mm", "other"]
    crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28", "other" ]
    ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Tamanho das coroas" )
    ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: lengths, prompt: "Comprimento")
    ProductTypeAttribute.create!(product_type: crankset, name: "crankset_material", kind: "multiple_choice", options: materials, prompt: "Material")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAINRING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28", "other" ]
    ProductTypeAttribute.create!(product_type: chainring, name: "chainring_crowns", kind: "multiple_choice", options: crowns, prompt: "Tamanho das coroas" )

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]
    ProductTypeAttribute.create!(product_type: battery, name: "battery_capacity", kind: "multiple_choice", options: capacities, prompt: "Capacidade")
    ProductTypeAttribute.create!(product_type: battery, name: "battery_cycles", kind: "text", options: nil, prompt: "Ciclos da bateria")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT SHIFTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    front_gears_options= [0, 1, 2, 3 ]
    ProductTypeAttribute.create!(product_type: front_shifter, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR SHIFTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    rear_gears_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: rear_shifter, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de valocidades")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CASSETTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    rear_gears_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: cassete, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de velocidades")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE DISC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    disc_sizes = ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ]
    ProductTypeAttribute.create!(product_type: brake_disc, name: "disc_size", kind: "multiple_choice", options: disc_sizes, prompt: "Tamanho do disco")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FORK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    ProductTypeAttribute.create!(product_type: front_fork, name: "fork_material", kind: "multiple_choice", options: materials, prompt: "Material")



  #   puts "Criando lista de estados e cidades..."
  #   StatesAndCitiesPopulate.populate!
  #   puts "-- OK!"
  #   ################################################################ CATEGORIES ################################################################
  #   ##### BIKES #####

  #   mtb = Category.create!(name: "mountain_bike", modalities: ["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country"])
  #   dirt = Category.create!(name: "dirt_street", modalities: ["street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"])
  #   road = Category.create!(name: "road", modalities: ["speed_performance", "triathlon", "ciclocross", "cicloviagem", "gravel"])
  #   urban = Category.create!(name: "urban", modalities: ["urban"])
  #   infant = Category.create!(name: "infant", modalities: ["infant"])

  #   ##### GENERAL #####
  #   documentation_type = ["receipt", "import_document", "foreign_tax_coupon", "no_documentation"]

  #   categories = [mtb, dirt, road, infant, urban ]

  #   ################################################################ PRODUCTS #########################################################
  #   puts "Products types and theis attributtes..."
  #   ################################## BIKE COMPONENTS
  #   bike_oriantations = [ "front", "rear", "both"]

  #   bike_types = ["bike", "e-bike"]

  #   adapters = ProductType.create(name: "adapters", prompt: "Adaptadores")
  #   battery = ProductType.create(name: "battery", prompt: "Bateria")
  #   blocking = ProductType.create(name: "blocking", prompt: "Blocagem")
  #   bearing = ProductType.create(name: "bearing", prompt: "Rolamento")
  #   brake = ProductType.create(name: "brake", prompt: "Freio")
  #   brake_levers = ProductType.create(name: "brake_levers", prompt: "Manete de Freio")
  #   brake_pad = ProductType.create(name: "brake_pad", prompt: "Pastilha de Freio")
  #   bottle_cage = ProductType.create(name: "bottle_cage", prompt: "Suporte para Garrafa")
  #   cassete = ProductType.create(name: "cassete", prompt: "Cassete")
  #   central_movement = ProductType.create(name: "central_movement", prompt: "Movimento Central")
  #   chain = ProductType.create(name: "chain", prompt: "Corrente")
  #   chain_guide = ProductType.create(name: "chain_guide", prompt: "Guia de Corrente")
  #   chainring = ProductType.create(name: "chainring", prompt: "Coroa") #coroa
  #   relation_kit_complete_group = ProductType.create(name: "relation_kit_complete_group", prompt: "Kit Relação / Grupo Completo")
  #   crankset = ProductType.create(name: "crankset", prompt: "Pedivela") # pedivela
  #   fender = ProductType.create(name: "fender", prompt: "Paralama")
  #   frame = ProductType.create(name: "frame", prompt: "Quadro")
  #   front_derailleur = ProductType.create(name: "front_derailleur", prompt: "Câmbio Dianteiro") #transmissão
  #   front_shifter = ProductType.create(name: "front_shifter", prompt: "Trocador / Passador Dianteiro")
  #   front_suspension = ProductType.create(name: "front_suspension", prompt: "Suspensão Dianteira")
  #   full_wheel = ProductType.create(name: "full_wheel", prompt: "Roda Completa")
  #   grips = ProductType.create(name: "grips", prompt: "Manopla")
  #   handlebar = ProductType.create(name: "handlebar", prompt: "Guidão")
  #   headset = ProductType.create(name: "headset", prompt: "Caixa de Direção") #caixa de direção
  #   hub = ProductType.create(name: "hub", prompt: "Cubo") # cubo
  #   hanger = ProductType.create(name: "hanger", prompt: "Gancheira") # cubo
  #   pedals = ProductType.create(name: "pedals", prompt: "Pedais")
  #   power_meter = ProductType.create(name: "power_meter", prompt: "Medidor de Potência")
  #   rim = ProductType.create(name: "rim", prompt: "Aro")
  #   saddle = ProductType.create(name: "saddle", prompt: "Selim")
  #   seat_post = ProductType.create(name: "seat_post", prompt: "Canote")
  #   sheave = ProductType.create(name: "sheave", prompt: "Roldana")
  #   spoke = ProductType.create(name: "spoke", prompt: "Raios") # raios
  #   rear_derailleur = ProductType.create(name: "rear_derailleur", prompt: "Câmbio Traseiro") #câmbio traseiro
  #   rear_shifter = ProductType.create(name: "rear_shifter", prompt: "Trocador / Passador Traseiro")
  #   rear_suspension = ProductType.create(name: "rear_suspension", prompt: "Shock / Suspensão Traseira") # shock
  #   stem = ProductType.create(name: "stem", prompt: "Mesa") # avanço/mesa
  #   tube = ProductType.create(name: "tube", prompt: "Câmara")
  #   tyre = ProductType.create(name: "tyre", prompt: "Pneu")


  #   ############################################################### ACCESSORIES

  #   air_bomb = ProductType.create(name: "air_bomb", prompt: "Bomba de Ar")
  #   eletronics = ProductType.create(name: "eletronics", prompt: "Eletrônicos")
  #   oil_lubricant = ProductType.create(name: "oil_lubricant", prompt: "Óleos e Lubrificante")
  #   stand = ProductType.create(name: "stand", prompt: "Cavaletes")
  #   tools = ProductType.create(name: "tools", prompt: "Ferramentas")
  #   car_protector = ProductType.create(name: "car_protector", prompt: "Protetor para Carros")
  #   training_roller = ProductType.create(name: "training_roller", prompt: "Rolo de Treino")
  #   bike_rack = ProductType.create(name: "bike_rack", prompt: "Suporte para Carro")



  #  ############################################################### CLOTHING

  #   bretelle = ProductType.create(name: "bretelle", prompt: "Bretelle")
  #   shorts = ProductType.create(name: "shorts", prompt: "Bermuda")
  #   inner_shorts = ProductType.create(name: "inner_shorts", prompt: "Bermuda Interior")
  #   shirt = ProductType.create(name: "shirt", prompt: "Camisa")
  #   pants = ProductType.create(name: "pants", prompt: "Calça")
  #   vest = ProductType.create(name: "vest", prompt: "Colete")
  #   windbreaker = ProductType.create(name: "windbreaker", prompt: "Corta Vento")
  #   gloves = ProductType.create(name: "gloves", prompt: "Luvas")
  #   socks = ProductType.create(name: "socks", prompt: "Meias")
  #   glasses = ProductType.create(name: "glasses", prompt: "Óculos")
  #   thermal_clothing = ProductType.create(name: "thermal_clothing", prompt: "Roupa Térmica")
  #   cap = ProductType.create(name: "cap", prompt: "Boné")
  #   helmet = ProductType.create(name: "helmet", prompt: "Capacete")
  #   elbow_pad = ProductType.create(name: "elbow_pad", prompt: "Cotoveleira")
  #   knee_pad = ProductType.create(name: "knee_pad", prompt: "Joelheira")
  #   water_bottle = ProductType.create(name: "water_bottle", prompt: "Garrafa")
  #   hydration_pack = ProductType.create(name: "hydration_pack", prompt: "Mochila de Hidratação")
  #   fanny_pack = ProductType.create(name: "fanny_pack", prompt: "Pochete")
  #   sneaker = ProductType.create(name: "sneaker", prompt: "Sapatilha")


  #   products_options = [adapters, battery, blocking, bearing, brake, brake_levers, brake_pad, bottle_cage, cassete, central_movement, chain, chain_guide, chainring, relation_kit_complete_group, crankset, fender, frame, front_derailleur, rear_derailleur, front_shifter, front_suspension, full_wheel, grips, handlebar, headset, hub, hanger, pedals, power_meter, rim, saddle, seat_post, sheave, spoke, rear_shifter, rear_suspension, stem, tube, tyre, air_bomb, eletronics, oil_lubricant, stand, tools, car_protector, training_roller, bike_rack, bretelle, shorts, inner_shorts, shirt, pants, vest, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, water_bottle, hydration_pack, fanny_pack, sneaker ]

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CLOTHES SIZES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   clothes_sizes = ["PP", "P", "M", "G", "GG", "XGG"]

  #   bretelle_sizes = ProductTypeAttribute.create!(product_type: bretelle, name: "bretelle_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   shorts_sizes = ProductTypeAttribute.create!(product_type: shorts, name: "shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   inner_shorts_sizes = ProductTypeAttribute.create!(product_type: inner_shorts, name: "inner_shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   shirt_sizes = ProductTypeAttribute.create!(product_type: shirt, name: "shirt_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   windbreaker_sizes = ProductTypeAttribute.create!(product_type: windbreaker, name: "windbreaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   gloves_sizes = ProductTypeAttribute.create!(product_type: gloves, name: "gloves_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   thermal_clothing_sizes = ProductTypeAttribute.create!(product_type: thermal_clothing, name: "thermal_clothing_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  #   cap_sizes = ProductTypeAttribute.create!(product_type: cap, name: "cap_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")

  #   shoes_sizes = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, "other"]

  #   socks_sizes = ProductTypeAttribute.create!(product_type: socks, name: "socks_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")
  #   sneaker_sizes = ProductTypeAttribute.create!(product_type: sneaker, name: "sneaker_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  #   frame_brands = [
  #     "Alfameq",
  #     "Astro",
  #     "Audax",
  #     "BH",
  #     "Bianchi",
  #     "BMC",
  #     "Caloi",
  #     "Cannondale",
  #     "Canyon",
  #     "Carrera",
  #     "Cervelo",
  #     "Corratec",
  #     "Cube",
  #     "dabomb",
  #     "Felt",
  #     "First",
  #     "Focus",
  #     "Fuji",
  #     "Giant",
  #     "Groove",
  #     "GT",
  #     "GTS",
  #     "Ibis",
  #     "Jamis",
  #     "Kona",
  #     "Lapierre",
  #     "Marin",
  #     "Merida",
  #     "Mosso",
  #     "Oggi",
  #     "Orbea",
  #     "Pinarello",
  #     "Raleigh",
  #     "Rava",
  #     "Ridley",
  #     "Santa_cruz",
  #     "Schwinn",
  #     "Scott",
  #     "Sense",
  #     "Soul",
  #     "Specialized",
  #     "Swift Carbon",
  #     "Trek",
  #     "Tsw",
  #     "Wilier",
  #     "YT",
  #     "Argon 21",
  #     "Bliv",
  #     "Blue",
  #     "Bottecchia",
  #     "Cipollini",
  #     "Cly",
  #     "Cumberland",
  #     "De Rosa",
  #     "E Moving",
  #     "Gary Fisher",
  #     "Gioia",
  #     "Kaiena",
  #     "Kestrel",
  #     "Kode",
  #     "Kuota",
  #     "Lazzaretti",
  #     "Lev E-Bike",
  #     "Litespeed",
  #     "Look",
  #     "Lotus",
  #     "Mercian",
  #     "Miyamura Gravel",
  #     "Open",
  #     "Quintana Roo",
  #     "Redland",
  #     "Riva",
  #     "Rose",
  #     "Sava",
  #     "Sundown",
  #     "Time",
  #     "Trinx",
  #     "Trust",
  #     "Velorbis",
  #     "Vicinitech",
  #     "Victory",
  #     "Eddy Merckx",
  #     "Salsa",
  #     "Surly",
  #     "Soma",
  #     "Diamondback",
  #     "Dahon"
  #   ].sort_by { |frame_brands| frame_brands }


  #   road_frame_sizes = ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  #   mtb_dirt_frame_sizes = [ "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
  #   frame_materials = ["aluminum", "carbon", "carbon_aluminum_chainstay", "other"]

  #   # front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  #   rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
  #   shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]


  #   frame_question_1 = ProductTypeAttribute.create!(product_type: frame, name: "documentation_type", kind: "multiple_choices", options: documentation_type, prompt: "Documentação" )
  #   frame_question_2 = ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choices", options: frame_materials, prompt: "Material do quadro" )
  #   frame_question_3 = ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choices", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro")
  #   frame_question_4 = ProductTypeAttribute.create!(product_type: frame, name: "suspension_type", kind: "multiple_choices", options: [ "no_suspension", "hardtail", "full_suspension"], prompt: "Tipo de suspensão")
  #   frame_question_5 = ProductTypeAttribute.create!(product_type: frame, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso suspensão traseira")
  #   frame_question_6 = ProductTypeAttribute.create!(product_type: frame, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho shock" )
  #   frame_question_7 = ProductTypeAttribute.create!(product_type: frame, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")

  #   # frame_question_2 = ProductTypeAttribute.create!(product_type: frame, name: "frame_brand", kind: "multiple_choices", options: frame_brands, prompt: "Marca do quadro" )
  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  #   brake_types = ["v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake" ]
  #   road_brake_models = ["105", "CLARIS", "DURA-ACE", "SORA", "TIAGRA", "TOURNEY", "ULTEGRA", "Apex", "Force", "GRX", "RED", "Rival", "S-Series", "other"]
  #   mtb_dirt_urban_brake_models = [" SLX", "ACERA", "ALIVIO", "ALTUS", "DEORE", "SAINT", "TOURNEY", "XT", "XTR", "ZEE", "Code", "DB", "G2", "GUIDE", "Level", "other"]
  #   front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]

  #   brake_question_1 = ProductTypeAttribute.create!(product_type: brake, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   brake_question_2 = ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio" )
  #   brake_question_3 = ProductTypeAttribute.create!(product_type: brake, name: "disc_size", kind: "multiple_choice", options: [ "140mm", "160mm", "180mm", "200mm", "203mm", "other" ], prompt: "Tamanho do disco" )
  #   brake_question_4 = ProductTypeAttribute.create!(product_type: brake, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")
  #   # brake_question_4 = ProductTypeAttribute.create!(product_type: brake, name: "brake_model", kind: "multiple_choices", options: road_brake_models || mtb_dirt_urban_brake_models, prompt: "Modelo")


  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   wheel_sizes = ["16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]
  #   rim_materials = ["aluminum", "carbon", "carbono_alumínio_chainstay", "other"]

  #   rim_question_1 = ProductTypeAttribute.create!(product_type: rim, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   rim_question_2 = ProductTypeAttribute.create!(product_type: rim, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda" )
  #   rim_question_3 = ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: rim_materials, prompt: "Qual material" )
  #   rim_question_4 = ProductTypeAttribute.create!(product_type: rim, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")


  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HANDLEBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   handlebar_sizes = ["680 mm", "690 mm", "700 mm", "710 mm", "720 mm", "730 mm", "740 mm", "750 mm", "760 mm", "770 mm", "780 mm", "790 mm", "800 mm", "810 mm", "820 mm" "Outro"]

  #   handlebar_question_1 = ProductTypeAttribute.create!(product_type: handlebar, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   handlebar_question_2 = ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_size", kind: "multiple_choice", options: handlebar_sizes, prompt: "Tamanho" )
  #   handlebar_question_3 = ProductTypeAttribute.create!(product_type: handlebar, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   front_suspension_travels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  #   mtb_dirt_urban_front_suspension_models = ["32", "34", "36", "38", "40", "30", "35", "BLUTO", "BOXXER", "DOMAIN", "JUDY", "LYRIK", "PARAGON", "PIKE", "REBA ", "RECON", "REVELATION", "RUDY", "SEKTOR", "SID", "YARI", "ZEB", "other"]

  #   front_suspension_question_1 = ProductTypeAttribute.create!(product_type: front_suspension, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   front_suspension_question_2 = ProductTypeAttribute.create!(product_type: front_suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Suspensão dianteira")
  #   front_suspension_question_3 = ProductTypeAttribute.create!(product_type: front_suspension, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda" )
  #   front_suspension_question_4 = ProductTypeAttribute.create!(product_type: front_suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")
  #   # front_suspension_question_4 = ProductTypeAttribute.create!(product_type: front_suspension, name: "model", kind: "multiple_choice", options: mtb_dirt_urban_front_suspension_models, prompt: "Modelo" )


  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  #   # rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
  #   mtb_dirt_urban_rear_suspension_models = ["DHX", "DHX2 ", "FLOAT DPS", "FLOAT DPX2", "FLOAT X", "FLOAT X2", "DELUXE", "MONARCH", "SIDLUXE", "SUPER DELUXE", "other"]

  #   rear_suspension_question_1 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Possui documentação" )
  #   rear_suspension_question_2 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Tamanho shock" )
  #   rear_suspension_question_3 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")
  #   # rear_suspension_question_4 = ProductTypeAttribute.create!(product_type: rear_suspension, name: "model", kind: "multiple_choice", options: mtb_dirt_urban_rear_suspension_models, prompt: "modelo" )


  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FULL_WHEEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   full_wheel_question_1 = ProductTypeAttribute.create!(product_type: full_wheel, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   full_wheel_question_2 = ProductTypeAttribute.create!(product_type: full_wheel, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda" )

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SPOKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   spoke_question_1 = ProductTypeAttribute.create!(product_type: spoke, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   spoke_question_2 = ProductTypeAttribute.create!(product_type: spoke, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda" )

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RELATION KIT / COMPLETE GROUP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  #   front_gears_options= [0, 1, 2, 3 ]
  #   rear_gears_options= [0, 1, 7, 8, 9, 10, 11, 12 ]

  #   relation_kit_question_1 = ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   relation_kit_question_2 = ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Marchas dianteiras" )
  #   relation_kit_question_3 = ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Marchas traseiras" )
  #   relation_kit_question_4 = ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  #   front_gears_options= [0, 1, 2, 3 ]
  #   # road_front_derailleur_models = ["105", "CLARIS", "DURA-ACE", "SORA", "TIAGRA", "TOURNEY", "ULTEGRA", "Force", "GRX", "RED", "Rival", "other"]
  #   # mtb_dirt_urban_front_derailleur_models = [" SLX", "ACERA", "ALIVIO", "ALTUS", "DEORE", "TOURNEY", "XT", "XTR", "EX1", "GX", "NX", "SX", "X01", "other"]

  #   front_derailleur_question_1 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   front_derailleur_question_2 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Quantas marchas" )
  #   front_derailleur_question_3 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..12).to_a, prompt: "Relação" )
  #   front_derailleur_question_4 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")
  #   # front_derailleur_question_4 = ProductTypeAttribute.create!(product_type: front_derailleur, name: "model", kind: "multiple_choice", options: road_front_derailleur_models ||mtb_dirt_urban_derailleur_models, prompt: "Modelo" )


  #   # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  #   # road_rear_derailleur_models = ["105", "CLARIS", "DURA-ACE", "SORA", "TIAGRA", "TOURNEY", "ULTEGRA", "Apex", "Force", "GRX", "RED", "Rival", "S-Series", "other"]
  #   # mtb_dirt_urban_rear_derailleur_models = [" SLX", "ACERA", "ALIVIO", "ALTUS", "DEORE", "SAINT", "TOURNEY", "XT", "XTR", "EX1", "GX", "NX", "SX", "X01", "XX1", "other"]
  #   rear_gears_options= [0, 1, 7, 8, 9, 10, 11, 12 ]

  #   rear_derailleur_question_1 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   rear_derailleur_question_2 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Quantas marchas" )
  #   rear_derailleur_question_3 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_teeth", kind: "multiple_choice", options: (1..12).to_a, prompt: "Relação" )
  #   rear_derailleur_question_4 = ProductTypeAttribute.create!(product_type: rear_derailleur, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")

  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   seat_post_types = ["retractable", "rigid"]
  #   seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]

  #   seat_post_question_1 = ProductTypeAttribute.create!(product_type: seat_post, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   seat_post_question_2 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do canote" )
  #   seat_post_question_3 = ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do canote" )
  #   seat_post_question_4 = ProductTypeAttribute.create!(product_type: seat_post, name: "condition", kind: "multiple_choices", options: ["new", "used"], prompt: "Condição")


  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   lengths = ["170mm", "172,5mm", "175mm"]
  #   crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28" ]

  #   crankset_question_1 = ProductTypeAttribute.create!(product_type: crankset, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   crankset_question_2 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Coroas" )
  #   crankset_question_3 = ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: lengths, prompt: "Comprimento" )
  #   crankset_question_4 = ProductTypeAttribute.create!(product_type: crankset, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição" )


  #   #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  #   capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]

  #   battery_question_1 = ProductTypeAttribute.create!(product_type: battery, name: "documentation_type", kind: "multiple_choice", options: documentation_type, prompt: "Documentação" )
  #   battery_question_2 = ProductTypeAttribute.create!(product_type: battery, name: "battery_capacity", kind: "multiple_choice", options: capacities, prompt: "Capacidade" )
  #   battery_question_3 = ProductTypeAttribute.create!(product_type: battery, name: "condition", kind: "multiple_choice", options: ["new", "used"], prompt: "Condição" )

  when "development"
    puts "Starting seed..."

    puts "Criando lista de estados e cidades..."
    StatesAndCitiesPopulate.populate!
    puts "-- OK!"
    ################################################################ CATEGORIES ################################################################
    ##### BIKES #####
    mtb = Category.create!(name: "mountain_bike", modalities: ["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country"])
    dirt = Category.create!(name: "dirt_street", modalities: ["street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"])
    road = Category.create!(name: "road", modalities: ["speed_performance", "triathlon", "ciclocross", "cicloviagem", "gravel"])
    urban = Category.create!(name: "urban", modalities: ["urban"])
    infant = Category.create!(name: "infant", modalities: ["infant"])

    ##### GENERAL #####
    documentation_type = ["receipt", "import_document", "foreign_tax_coupon", "no_documentation"]


    categories = [mtb, dirt, road, infant, urban ]

    puts "Starting deliting what don't need..."


    ################################################################ PRODUCTS #########################################################
    puts "Products types and theis attributtes..."

    ################################## BIKE COMPONENTS
    bike_oriantations = [ "front", "rear", "both"]

    bike_types = ["bike", "e-bike"]


    adapters = ProductType.create(name: "adapters", prompt: "Adaptadores")
    battery = ProductType.create(name: "battery", prompt: "Bateria")
    blocking = ProductType.create(name: "blocking", prompt: "Blocagem")
    bearing = ProductType.create(name: "bearing", prompt: "Rolamento")
    brake = ProductType.create(name: "brake", prompt: "Freio")
    brake_disc = ProductType.create(name: "brake_disc", prompt: "Disco de Freio")
    brake_levers = ProductType.create(name: "brake_levers", prompt: "Manete de Freio")
    brake_pad = ProductType.create(name: "brake_pad", prompt: "Pastilha de Freio")
    bottle_cage = ProductType.create(name: "bottle_cage", prompt: "Suporte para Garrafa")
    cassete = ProductType.create(name: "cassete", prompt: "Cassete")
    central_movement = ProductType.create(name: "central_movement", prompt: "Movimento Central")
    chain = ProductType.create(name: "chain", prompt: "Corrente")
    chain_guide = ProductType.create(name: "chain_guide", prompt: "Guia de Corrente")
    chainring = ProductType.create(name: "chainring", prompt: "Coroa")
    relation_kit_complete_group = ProductType.create(name: "relation_kit_complete_group", prompt: "Kit Relação/Grupo Completo")
    crankset = ProductType.create(name: "crankset", prompt: "Pedivela")
    fender = ProductType.create(name: "fender", prompt: "Para-lama")
    frame = ProductType.create(name: "frame", prompt: "Quadro")
    front_derailleur = ProductType.create(name: "front_derailleur", prompt: "Câmbio Dianteiro")
    front_shifter = ProductType.create(name: "front_shifter", prompt: "Trocador/Passador Dianteiro")
    front_suspension = ProductType.create(name: "front_suspension", prompt: "Suspensão Dianteira")
    front_fork = ProductType.create(name: "front_fork", prompt: "Garfo")
    wheel = ProductType.create(name: "wheel", prompt: "Roda")
    grips = ProductType.create(name: "grips", prompt: "Punho/Manopla")
    handlebar = ProductType.create(name: "handlebar", prompt: "Guidão")
    headset = ProductType.create(name: "headset", prompt: "Caixa de Direção")
    hub = ProductType.create(name: "hub", prompt: "Cubo")
    hanger = ProductType.create(name: "hanger", prompt: "Gancheira")
    pedal = ProductType.create(name: "pedal", prompt: "Pedal")
    power_meter = ProductType.create(name: "power_meter", prompt: "Medidor de Potência")
    rim = ProductType.create(name: "rim", prompt: "Aro")
    saddle = ProductType.create(name: "saddle", prompt: "Selim/Banco")
    seat_post = ProductType.create(name: "seat_post", prompt: "Canote")
    sheave = ProductType.create(name: "sheave", prompt: "Roldana")
    rear_derailleur = ProductType.create(name: "rear_derailleur", prompt: "Câmbio Traseiro")
    rear_shifter = ProductType.create(name: "rear_shifter", prompt: "Trocador/Passador Traseiro")
    rear_suspension = ProductType.create(name: "rear_suspension", prompt: "Shock/Suspensão Traseira")
    stem = ProductType.create(name: "stem", prompt: "Avanço/Mesa")
    tube = ProductType.create(name: "tube", prompt: "Câmara")
    tyre = ProductType.create(name: "tyre", prompt: "Pneu")


    ############################################################### ACCESSORIES

    air_bomb = ProductType.create(name: "air_bomb", prompt: "Bomba de Ar")
    eletronics = ProductType.create(name: "eletronics", prompt: "Eletrônicos")
    oil_lubricant = ProductType.create(name: "oil_lubricant", prompt: "Óleos e Lubrificantes")
    stand = ProductType.create(name: "stand", prompt: "Cavaletes")
    tools = ProductType.create(name: "tools", prompt: "Ferramentas")
    car_protectors = ProductType.create(name: "car_protectors", prompt: "Protetores para Carros")
    training_roller = ProductType.create(name: "training_roller", prompt: "Rolo de Treino")
    bike_rack = ProductType.create(name: "bike_rack", prompt: "Suportes para Carro")
    water_bottle = ProductType.create(name: "water_bottle", prompt: "Garrafa")


    ############################################################### CLOTHING

    bretelle = ProductType.create(name: "bretelle", prompt: "Bretelle")
    shorts = ProductType.create(name: "shorts", prompt: "Bermuda")
    inner_shorts = ProductType.create(name: "inner_shorts", prompt: "Bermuda Interior")
    shirt = ProductType.create(name: "shirt", prompt: "Camisa")
    pants = ProductType.create(name: "pants", prompt: "Calça")
    vest = ProductType.create(name: "vest", prompt: "Colete")
    coat = ProductType.create(name: "coat", prompt: "Casaco")
    windbreaker = ProductType.create(name: "windbreaker", prompt: "Corta Vento")
    gloves = ProductType.create(name: "gloves", prompt: "Luvas")
    socks = ProductType.create(name: "socks", prompt: "Meias")
    glasses = ProductType.create(name: "glasses", prompt: "Óculos")
    thermal_clothing = ProductType.create(name: "thermal_clothing", prompt: "Roupa Térmica")
    cap = ProductType.create(name: "cap", prompt: "Boné")
    helmet = ProductType.create(name: "helmet", prompt: "Capacete")
    elbow_pad = ProductType.create(name: "elbow_pad", prompt: "Cotoveleira")
    knee_pad = ProductType.create(name: "knee_pad", prompt: "Joelheira")
    hydration_pack = ProductType.create(name: "hydration_pack", prompt: "Mochila de Hidratação")
    fanny_pack = ProductType.create(name: "fanny_pack", prompt: "Pochete")
    sneaker = ProductType.create(name: "sneaker", prompt: "Sapatilha")

    # products_options = [adapters, battery, blocking, bearing, brake, brake_levers, brake_pad, bottle_cage, cassete, central_movement, chain, chain_guide, chainring, relation_kit_complete_group, crankset, fender, frame, front_derailleur, rear_derailleur, front_shifter, front_suspension, full_wheel, grips, handlebar, headset, hub, hanger, pedals, power_meter, rim, saddle, seat_post, sheave, spoke, rear_shifter, rear_suspension, stem, tube, tyre, air_bomb, eletronics, oil_lubricant, stand, tools, car_protector, training_roller, bike_rack, bretelle, shorts, inner_shorts, shirt, pants, vest, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, water_bottle, hydration_pack, fanny_pack, sneaker ]

    clothes_sizes = ["PP", "P", "M", "G", "GG", "XGG", "Único"]
    bretelle_sizes = ProductTypeAttribute.create!(product_type: bretelle, name: "bretelle_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    shorts_sizes = ProductTypeAttribute.create!(product_type: shorts, name: "shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    inner_shorts_sizes = ProductTypeAttribute.create!(product_type: inner_shorts, name: "inner_shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    shirt_sizes = ProductTypeAttribute.create!(product_type: shirt, name: "shirt_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    vest_sizes = ProductTypeAttribute.create!(product_type: vest, name: "vest_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    windbreaker_sizes = ProductTypeAttribute.create!(product_type: windbreaker, name: "windbreaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    gloves_sizes = ProductTypeAttribute.create!(product_type: gloves, name: "gloves_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    thermal_clothing_sizes = ProductTypeAttribute.create!(product_type: thermal_clothing, name: "thermal_clothing_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    cap_sizes = ProductTypeAttribute.create!(product_type: cap, name: "cap_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    pants_sizes = ProductTypeAttribute.create!(product_type: pants, name: "pants_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    helmet_sizes = ProductTypeAttribute.create!(product_type: helmet, name: "helmet_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    elbow_pad_sizes = ProductTypeAttribute.create!(product_type: elbow_pad, name: "elbow_pad_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    knee_pad_sizes = ProductTypeAttribute.create!(product_type: knee_pad, name: "knee_pad_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    coat_sizes = ProductTypeAttribute.create!(product_type: coat, name: "coat_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    hydration_pack_sizes = ProductTypeAttribute.create!(product_type: hydration_pack, name: "hydration_pack_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    glasses_sizes = ProductTypeAttribute.create!(product_type: glasses, name: "glasses_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    fanny_pack_sizes = ProductTypeAttribute.create!(product_type: fanny_pack, name: "fanny_pack_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
    shoes_sizes = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, "other"]
    socks_sizes = ProductTypeAttribute.create!(product_type: socks, name: "socks_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")
    sneaker_sizes = ProductTypeAttribute.create!(product_type: sneaker, name: "sneaker_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")


    materials = [ ["aluminum", "Alumínio" ], ["carbon", "Carbono"], ["carbon_aluminum_chainstay", "Carbono/Aumínio (Chainstay)" ], ["other", "Outro" ]]

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    frame_brands = [ "Alfameq", "Astro", "Audax", "BH", "Bianchi", "BMC", "Caloi", "Cannondale", "Canyon", "Carrera", "Cervelo", "Corratec", "Cube", "dabomb", "Felt", "First", "Focus", "Fuji", "Giant", "Groove", "GT", "GTS", "Ibis", "Jamis", "Kona", "Lapierre", "Marin", "Merida", "Mosso", "Oggi", "Orbea", "Pinarello", "Raleigh", "Rava", "Ridley", "Santa_cruz", "Schwinn", "Scott", "Sense", "Soul", "Specialized", "Swift Carbon", "Trek", "Tsw", "Wilier", "YT", "Argon 21", "Bliv", "Blue", "Bottecchia", "Cipollini", "Cly", "Cumberland", "De Rosa", "E Moving", "Gary Fisher", "Gioia", "Kaiena", "Kestrel", "Kode", "Kuota", "Lazzaretti", "L E-Bike", "Litespeed", "Look", "Lotus", "Mercian", "Miyamura Gravel", "Open", "Quintana Roo", "Redland", "Riva", "Rose", "Sava", "Sundown", "Time", "Trinx", "Trust", "Velorbis", "Vicinitech", "Victory", "Eddy Merckx", "Salsa", "Surly", "Soma", "Diamondback", "Dahon", "Yeti", "other"
    ].sort_by { |frame_brands| frame_brands }

    road_frame_sizes = ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
    mtb_dirt_frame_sizes = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "S1", "S2", "S3", "S4", "S5", "S6", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
    rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
    shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
    battery_capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]
    ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choice", options: materials, prompt: "Material do quadro" )
    ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choice", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro")
    ProductTypeAttribute.create!(product_type: frame, name: "suspension_type", kind: "multiple_choice", options: [["no_suspension", "Sem Suspensão"], ["hardtail", "Hardtail" ], ["full_suspension", "Full Suspension" ]], prompt: "Tipo de suspensão")
    ProductTypeAttribute.create!(product_type: frame, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso da suspensão traseira")
    ProductTypeAttribute.create!(product_type: frame, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Medida do shock") # caso possam ser opcionais os atributos
    ProductTypeAttribute.create!(product_type: frame, name: "bike_type", kind: "multiple_choice", options: ["Bike", "E-Bike"], prompt: "Tipo de bike")
    ProductTypeAttribute.create!(product_type: frame, name: "battery_capacity", kind: "multiple_choice", options: battery_capacities, prompt: "Capacidade da bateria") # se for e-bike
    ProductTypeAttribute.create!(product_type: frame, name: "battery_cycles", kind: "text", options: ["", ""], prompt: "Ciclos da bateria") # se for e-bike ?? option nil ?
    ProductTypeAttribute.create!(product_type: frame, name: "motor_mileage", kind: "text", options: ["", ""], prompt: "KM do motor") # se for e-bike ???? option "" ?


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    # road_brake_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "Outro"]
    # mtb_dirt_urban_brake_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "Outro"]
    brake_types = [["v_brake", "V-Brake"], ["hydraulic_disc", "À Disco Hidraulico" ], ["mechanical_disc", "À Disco Mecânico" ], ["coaster_brake", "Contra Pedal" ]]
    ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio" )
    ProductTypeAttribute.create!(product_type: brake, name: "disc_include", kind: "multiple_choice", options: ["Sim", "Não"], prompt: "Acompanha Disco?") # se for hidraulico ou mecanico à disco
    ProductTypeAttribute.create!(product_type: brake, name: "brake_disc_size", kind: "multiple_choice", options: ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ], prompt: "Tamanho do disco")  # se acompanhar disco

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    wheel_sizes = ["16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]
    ProductTypeAttribute.create!(product_type: rim, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")
    ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: materials, prompt: "Material")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HANDLEBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    handlebar_sizes_mtb_dirt_urban_infant = ["660 mm","680 mm", "690 mm", "700 mm", "710 mm", "720 mm", "730 mm", "740 mm", "750 mm", "760 mm", "770 mm", "780 mm", "790 mm", "800 mm", "810 mm", "820 mm", "other"]
    handlebar_sizes_road = ["360 mm", "380 mm", "400 mm", "420 mm", "440 mm", "460 mm", "other"]
    handlebar_diameters = ["25,4 mm", "31,8 mm", "other"]
    handlebar_drops = ["130 mm", "140 mm", "150mm", "160mm", "other"]
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_size", kind: "multiple_choice", options: handlebar_sizes_mtb_dirt_urban_infant || handlebar_sizes_road, prompt: "Tamanho" ) # opçõs de acordo com categoria #???
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_diameter", kind: "multiple_choice", options: handlebar_diameters, prompt: "Diâmetro") #???
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_drop", kind: "multiple_choice", options: handlebar_drops, prompt: "Drop") #??? perguntar se for categoria road
    ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_material", kind: "multiple_choice", options: materials, prompt: "Material") #???


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    front_suspension_travels = ["80mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
    # mtb_dirt_urban_front_suspension_models = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "FOX 30", "FOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]
    ProductTypeAttribute.create!(product_type: front_suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Curso da suspensão dianteira")
    ProductTypeAttribute.create!(product_type: front_suspension, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
    # rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
    # mtb_dirt_urban_rear_suspension_models = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "ROCKSHOX VIVID", "other"]
    ProductTypeAttribute.create!(product_type: rear_suspension, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Medida do Shock")
    # ProductTypeAttribute.create!(product_type: rear_suspension, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso da supensão traseira" )

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< WHEEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    ProductTypeAttribute.create!(product_type: wheel, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")
    ProductTypeAttribute.create!(product_type: wheel, name: "wheel_material", kind: "multiple_choice", options: materials, prompt: "Material da roda")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RELATION KIT/COMPLETE GROUP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    front_gears_options= [0, 1, 2, 3 ]
    rear_gears_options= [0, 1, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "rear_or_front_and_rear_derailleur", kind: "multiple_choice", options: [["front_and_rear", "Dianteira e Traseira"], ["rear", "Traseira"]], prompt: "Tipo de relação")
    ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "front_derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas (dianteiro)") #condicionada ao tipo
    ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "rear_derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de velocidades (traseiro)")  #condicionada ao tipo

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    # road_front_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
    # mtb_dirt_urban_front_derailleur_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]
    front_gears_options= [0, 1, 2, 3 ]
    ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas")


    # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    # road_rear_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
    # mtb_dirt_urban_rear_derailleur_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]
    rear_gears_options = [0, 1, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: (1..12).to_a, prompt: "Número de velocidades")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    seat_post_types = [["retractable", "Retrátil"], ["rigid", "Rígido"]]
    seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]
    seat_post_diameter = ["25.4mm", "27.2 mm", "30.9mm", "31.6mm", "34.9mm", "other" ]
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do Canote")
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do Canote")
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_material", kind: "multiple_choice", options: materials, prompt: "Material") # só rígido
    ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_diameter", kind: "multiple_choice", options: seat_post_diameter, prompt: "Diâmetro")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    lengths = ["170mm", "172,5mm", "175mm", "other"]
    crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28", "other" ]
    ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Tamanho das coroas" )
    ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: lengths, prompt: "Comprimento")
    ProductTypeAttribute.create!(product_type: crankset, name: "crankset_material", kind: "multiple_choice", options: materials, prompt: "Material")


    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAINRING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28", "other" ]
    ProductTypeAttribute.create!(product_type: chainring, name: "chainring_crowns", kind: "multiple_choice", options: crowns, prompt: "Tamanho das coroas" )

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]
    ProductTypeAttribute.create!(product_type: battery, name: "battery_capacity", kind: "multiple_choice", options: capacities, prompt: "Capacidade")
    ProductTypeAttribute.create!(product_type: battery, name: "battery_cycles", kind: "text", options: ["", ""], prompt: "Ciclos da bateria")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT SHIFTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    front_gears_options= [0, 1, 2, 3 ]
    ProductTypeAttribute.create!(product_type: front_shifter, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR SHIFTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    rear_gears_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: rear_shifter, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de valocidades")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CASSETTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    rear_gears_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    ProductTypeAttribute.create!(product_type: cassete, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de velocidades")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE DISC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    disc_sizes = ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ]
    ProductTypeAttribute.create!(product_type: brake_disc, name: "disc_size", kind: "multiple_choice", options: disc_sizes, prompt: "Tamanho do disco")

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FORK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    ProductTypeAttribute.create!(product_type: front_fork, name: "fork_material", kind: "multiple_choice", options: materials, prompt: "Material")

    ################################################################ USERS ################################################################
    buyer = User.create!(email: "user@app.com", password: "123456", document_number: "45423616085", phone_number: "(31) 998943837", cep: "30112-000" )
    seller = User.create!(email: "test@app.com", password: "123456", document_number: "13800898080", phone_number: "(31) 998943837", cep: "30112-000" )
    bike_user = User.create!(email: "bike@app.com", password: "123456", document_number: "10581022068", phone_number: "(31) 998943837", cep: "30112-000" )
    admin = User.create!(email: "admin@app.com", password: "123456", document_number: "08439700067", phone_number: "(31) 998943837", cep: "30112-000", access: "admin" )

    puts "creating users"

    user1 = User.create!(email: "user1@app.com", password: "123456")
    user2 = User.create!(email: "user2@app.com", password: "123456")
    user3 = User.create!(email: "user3@app.com", password: "123456")
    user4 = User.create!(email: "user4@app.com", password: "123456")
    user5 = User.create!(email: "user5@app.com", password: "123456")
    user6 = User.create!(email: "user6@app.com", password: "123456")
    user7 = User.create!(email: "user7@app.com", password: "123456")
    user8 = User.create!(email: "user8@app.com", password: "123456")
    user9 = User.create!(email: "user9@app.com", password: "123456")
    user10 = User.create!(email: "user10@app.com", password: "123456")
    user11 = User.create!(email: "user11@app.com", password: "123456")
    user12 = User.create!(email: "user12@app.com", password: "123456")
    user13 = User.create!(email: "user13@app.com", password: "123456")
    user14 = User.create!(email: "user14@app.com", password: "123456")
    user15 = User.create!(email: "user15@app.com", password: "123456")
    user16 = User.create!(email: "user16@app.com", password: "123456")
    user17 = User.create!(email: "user17@app.com", password: "123456")
    user18 = User.create!(email: "user18@app.com", password: "123456")
    user19 = User.create!(email: "user19@app.com", password: "123456")
    user20 = User.create!(email: "user20@app.com", password: "123456")

      users = [user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        user7,
        user8,
        user9,
        user10,
        user11,
        user12,
        user13,
        user14,
        user15,
        user16,
        user17,
        user18,
        user19,
        user20]



    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< COMPONENTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

    puts "Creating 10 Products and their products attributes..."

    10.times do
      user = users.sample
      category = categories.sample

      product = Product.create!(user: user,
        name: ["Ultegra", "Ace", "X-Trek", "Gtx", "Force"].sample,
        category: category,
        modality: category.modalities.sample,
        product_type: [adapters, battery, blocking, bearing, brake, brake_disc, brake_levers, brake_pad, bottle_cage, cassete, central_movement, chain, chain_guide, chainring, relation_kit_complete_group, crankset, fender, frame, front_derailleur, front_shifter, front_suspension, front_fork, wheel, grips, handlebar, headset, hub, hanger, pedal, power_meter, rim, saddle, seat_post, sheave, rear_derailleur, rear_shifter, rear_suspension, stem, tube, tyre, air_bomb, eletronics, oil_lubricant, stand, tools, car_protectors, training_roller, bike_rack, water_bottle, bretelle, shorts, inner_shorts, shirt, pants, vest, coat, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, hydration_pack, fanny_pack,
          sneaker].sample,
        brand: ["SHIMANO", "FOX", "SRAM", "ROCKSHOX"].sample,
        model: ["Ultegra", "Ace", "X-Trek", "Gtx", "Force"].sample,
        city_id: [23, 45, 57, 453, 23].sample,
        state_id: [23, 11, 7, 4, 10].sample,
        year: ["2017", "2018", "2019", "2020", "2021", "2022"].sample,
        description: "Único dono com funcinamento perfeito",
        price_in_cents: rand(10000..50000),
        quantity: rand(1..10)

      )

      advertisement = Advertisement.create!(advertisable: product, user: user, status: ["waiting_review", "pending", "approved"].sample, price_in_cents: 15000)
      product_attributes =  ProductTypeAttribute.where(product_type: product.product_type).each do | product_type_attribute |
        ProductAttribute.create!(product: product, product_type_attribute: product_type_attribute, value: product_type_attribute.options.sample )
      end
      puts "next"
    end

    #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BIKES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
    structural_visual_condition = ["perfect_condition", "minor_surface_scratches", "spalls_in_paint", "painted_frame", "frame_welded_repaired", "frame_cracks_or_fissures_must_be_repaired", "components_welded_repaired", "components_cracks_or_fissures_must_be_repaired" ]

    opareting_condition = ["perfect_condition", "rears_worn_out_higher_75", "hifters_not_working_properly", "front_suspension_not_working_properly", "rear_suspension_not_working_properly", "suspensions_lock_not_working_properly", "brake_not_working_properly", "retractable_seat_post_not_working_properly", "creaking_when_pedaling", "wheels_bent", "tyres_worn_out_minus_50"]

    suspension_types = ["no_suspension", "full_suspension", "hardtail"]

    puts "Creating 10 Bikes..."

    10.times do
      category = [mtb, dirt, road].sample
      user = users.sample
      types = ["e-bike", "bike"]

      bike = Bike.create!(
        category_id:  category.id,
        modality: category.modalities.sample,
        bike_type: types.sample,
        price_in_cents: rand(1000000..2200000),
        quantity: 1,
        city_id: [23, 45, 57, 453, 23].sample,
        state_id: [23, 11, 7, 4, 10].sample,
        user: user,
        frame_brand: frame_brands.sample,
        model: ["GTX", "Sense mt-4r", "Predator", "Trilheiro", "Sense", "Backtrak", "F-Race"].sample,
        year: ["2017", "2018", "2019", "2020", "2021", "2022"].sample,
        frame_size: (road_frame_sizes + mtb_dirt_frame_sizes).sample,
        frame_material:  ["aluminum", "carbon", "carbon_aluminum_chainstay"].sample,
        rim_size: "19''",
        number_of_front_gears: 1,
        number_of_rear_gears: 16,
        brake_type: brake_types.sample,
        suspension_type: suspension_types.sample,
        front_suspension_travel: front_suspension_travels.sample,
        rear_suspension_travel: shock_sizes.sample,
        seat_post_type: seat_post_types.sample,
        seat_post_travel: seat_post_travels.sample,
        weight: [ 15.0, 16.3, 15.7, 17.4].sample,
        bike_condition: ["new", "used" ].sample,
        bike_condition_status: ["bad", "good", "reasonable", "excellent"].sample,
        bike_condition_description: "Show de bola",
        documentation_type: documentation_type.sample,
        description: "Bicicleta em perfeito estado apenas 1 dono.",
        accessories: "Não"
      )
      advertisement = Advertisement.create!(advertisable: bike, user: user, status: ["waiting_review", "pending", "approved"].sample, price_in_cents: 15000)

    end
    puts "Seed finished"
  end




















  #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< NOVO SEED >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  # adapters = ProductType.create(name: "adapters", prompt: "Adaptadores")
  # battery = ProductType.create(name: "battery", prompt: "Bateria")
  # blocking = ProductType.create(name: "blocking", prompt: "Blocagem")
  # bearing = ProductType.create(name: "bearing", prompt: "Rolamento")
  # brake = ProductType.create(name: "brake", prompt: "Freio")
  # brake_disc = ProductType.create(name: "brake_disc", prompt: "Disco de Freio")
  # brake_levers = ProductType.create(name: "brake_levers", prompt: "Manete de Freio")
  # brake_pad = ProductType.create(name: "brake_pad", prompt: "Pastilha de Freio")
  # bottle_cage = ProductType.create(name: "bottle_cage", prompt: "Suporte para Garrafa")
  # cassette = ProductType.create(name: "cassette", prompt: "Cassete")
  # central_movement = ProductType.create(name: "central_movement", prompt: "Movimento Central")
  # chain = ProductType.create(name: "chain", prompt: "Corrente")
  # chain_guide = ProductType.create(name: "chain_guide", prompt: "Guia de Corrente")
  # chainring = ProductType.create(name: "chainring", prompt: "Coroa")
  # relation_kit_complete_group = ProductType.create(name: "relation_kit_complete_group", prompt: "Kit Relação/Grupo Completo")
  # crankset = ProductType.create(name: "crankset", prompt: "Pedivela")
  # fender = ProductType.create(name: "fender", prompt: "Para-lama")
  # frame = ProductType.create(name: "frame", prompt: "Quadro")
  # front_derailleur = ProductType.create(name: "front_derailleur", prompt: "Câmbio Dianteiro")
  # front_shifter = ProductType.create(name: "front_shifter", prompt: "Trocador/Passador Dianteiro")
  # front_suspension = ProductType.create(name: "front_suspension", prompt: "Suspensão Dianteira")
  # fork = ProductType.create(name: "fork", prompt: "Garfo")
  # wheel = ProductType.create(name: "wheel", prompt: "Roda")
  # grips = ProductType.create(name: "grips", prompt: "Punho/Manopla")
  # handlebar = ProductType.create(name: "handlebar", prompt: "Guidão")
  # headset = ProductType.create(name: "headset", prompt: "Caixa de Direção")
  # hub = ProductType.create(name: "hub", prompt: "Cubo")
  # hanger = ProductType.create(name: "hanger", prompt: "Gancheira")
  # pedal = ProductType.create(name: "pedal", prompt: "Pedal")
  # power_meter = ProductType.create(name: "power_meter", prompt: "Medidor de Potência")
  # rim = ProductType.create(name: "rim", prompt: "Aro")
  # saddle = ProductType.create(name: "saddle", prompt: "Selim/Banco")
  # seat_post = ProductType.create(name: "seat_post", prompt: "Canote")
  # sheave = ProductType.create(name: "sheave", prompt: "Roldana")
  # rear_derailleur = ProductType.create(name: "rear_derailleur", prompt: "Câmbio Traseiro")
  # rear_shifter = ProductType.create(name: "rear_shifter", prompt: "Trocador/Passador Traseiro")
  # rear_suspension = ProductType.create(name: "rear_suspension", prompt: "Shock/Suspensão Traseira")
  # stem = ProductType.create(name: "stem", prompt: "Avanço/Mesa")
  # tube = ProductType.create(name: "tube", prompt: "Câmara")
  # tyre = ProductType.create(name: "tyre", prompt: "Pneu")


  # ############################################################### ACCESSORIES

  # air_bomb = ProductType.create(name: "air_bomb", prompt: "Bomba de Ar")
  # eletronics = ProductType.create(name: "eletronics", prompt: "Eletrônicos")
  # oil_lubricant = ProductType.create(name: "oil_lubricant", prompt: "Óleos e Lubrificantes")
  # stand = ProductType.create(name: "stand", prompt: "Cavaletes")
  # tools = ProductType.create(name: "tools", prompt: "Ferramentas")
  # car_protectors = ProductType.create(name: "car_protectors", prompt: "Protetores para Carros")
  # training_roller = ProductType.create(name: "training_roller", prompt: "Rolo de Treino")
  # bike_rack = ProductType.create(name: "bike_rack", prompt: "Suportes para Carro")
  # water_bottle = ProductType.create(name: "water_bottle", prompt: "Garrafa")


  # ############################################################### CLOTHING

  # bretelle = ProductType.create(name: "bretelle", prompt: "Bretelle")
  # shorts = ProductType.create(name: "shorts", prompt: "Bermuda")
  # inner_shorts = ProductType.create(name: "inner_shorts", prompt: "Bermuda Interior")
  # shirt = ProductType.create(name: "shirt", prompt: "Camisa")
  # pants = ProductType.create(name: "pants", prompt: "Calça")
  # vest = ProductType.create(name: "vest", prompt: "Colete")
  # coat = ProductType.create(name: "coat", prompt: "Casaco")
  # windbreaker = ProductType.create(name: "windbreaker", prompt: "Corta Vento")
  # gloves = ProductType.create(name: "gloves", prompt: "Luvas")
  # socks = ProductType.create(name: "socks", prompt: "Meias")
  # glasses = ProductType.create(name: "glasses", prompt: "Óculos")
  # thermal_clothing = ProductType.create(name: "thermal_clothing", prompt: "Roupa Térmica")
  # cap = ProductType.create(name: "cap", prompt: "Boné")
  # helmet = ProductType.create(name: "helmet", prompt: "Capacete")
  # elbow_pad = ProductType.create(name: "elbow_pad", prompt: "Cotoveleira")
  # knee_pad = ProductType.create(name: "knee_pad", prompt: "Joelheira")
  # hydration_pack = ProductType.create(name: "hydration_pack", prompt: "Mochila de Hidratação")
  # fanny_pack = ProductType.create(name: "fanny_pack", prompt: "Pochete")
  # sneaker = ProductType.create(name: "sneaker", prompt: "Sapatilha")


  # products_options = [adapters, battery, blocking, bearing, brake, brake_levers, brake_pad, bottle_cage, cassete, central_movement, chain, chain_guide, chainring, relation_kit_complete_group, crankset, fender, frame, front_derailleur, rear_derailleur, front_shifter, front_suspension, full_wheel, grips, handlebar, headset, hub, hanger, pedals, power_meter, rim, saddle, seat_post, sheave, spoke, rear_shifter, rear_suspension, stem, tube, tyre, air_bomb, eletronics, oil_lubricant, stand, tools, car_protector, training_roller, bike_rack, bretelle, shorts, inner_shorts, shirt, pants, vest, windbreaker, gloves, socks, glasses, thermal_clothing, cap, helmet, elbow_pad, knee_pad, water_bottle, hydration_pack, fanny_pack, sneaker ]

  # clothes_sizes = ["PP", "P", "M", "G", "GG", "XGG", "Único"]

  # bretelle_sizes = ProductTypeAttribute.create!(product_type: bretelle, name: "bretelle_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # shorts_sizes = ProductTypeAttribute.create!(product_type: shorts, name: "shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # inner_shorts_sizes = ProductTypeAttribute.create!(product_type: inner_shorts, name: "inner_shorts_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # shirt_sizes = ProductTypeAttribute.create!(product_type: shirt, name: "shirt_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # vest_sizes = ProductTypeAttribute.create!(product_type: vest, name: "vest_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # windbreaker_sizes = ProductTypeAttribute.create!(product_type: windbreaker, name: "windbreaker_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # gloves_sizes = ProductTypeAttribute.create!(product_type: gloves, name: "gloves_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # thermal_clothing_sizes = ProductTypeAttribute.create!(product_type: thermal_clothing, name: "thermal_clothing_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # cap_sizes = ProductTypeAttribute.create!(product_type: cap, name: "cap_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # pants_sizes = ProductTypeAttribute.create!(product_type: pants, name: "pants_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # helmet_sizes = ProductTypeAttribute.create!(product_type: helmet, name: "helmet_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # vest_sizes = ProductTypeAttribute.create!(product_type: vest, name: "vest_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # elbow_pad_sizes = ProductTypeAttribute.create!(product_type: elbow_pad, name: "elbow_pad_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # knee_pad_sizes = ProductTypeAttribute.create!(product_type: knee_pad, name: "knee_pad_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # coat_sizes = ProductTypeAttribute.create!(product_type: coat, name: "coat_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # hydration_pack_sizes = ProductTypeAttribute.create!(product_type: hydration_pack, name: "hydration_pack_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # glasses_sizes = ProductTypeAttribute.create!(product_type: glasses, name: "glasses_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")
  # fanny_pack_sizes = ProductTypeAttribute.create!(product_type: fanny_pack, name: "fanny_pack_size", kind: "multiple_choices", options: clothes_sizes, prompt: "Tamanho")



  # shoes_sizes = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, "other"]

  # socks_sizes = ProductTypeAttribute.create!(product_type: socks, name: "socks_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")
  # sneaker_sizes = ProductTypeAttribute.create!(product_type: sneaker, name: "sneaker_size", kind: "multiple_choices", options: shoes_sizes, prompt: "Tamanho")



  # materials = ["aluminum", "carbon", "carbon_aluminum_chainstay", "other"]

  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # frame_brands = [ "Alfameq", "Astro", "Audax", "BH", "Bianchi", "BMC", "Caloi", "Cannondale", "Canyon", "Carrera", "Cervelo", "Corratec", "Cube", "dabomb", "Felt", "First", "Focus", "Fuji", "Giant", "Groove", "GT", "GTS", "Ibis", "Jamis", "Kona", "Lapierre", "Marin", "Merida", "Mosso", "Oggi", "Orbea", "Pinarello", "Raleigh", "Rava", "Ridley", "Santa_cruz", "Schwinn", "Scott", "Sense", "Soul", "Specialized", "Swift Carbon", "Trek", "Tsw", "Wilier", "YT", "Argon 21", "Bliv", "Blue", "Bottecchia", "Cipollini", "Cly", "Cumberland", "De Rosa", "E Moving", "Gary Fisher", "Gioia", "Kaiena", "Kestrel", "Kode", "Kuota", "Lazzaretti", "L E-Bike", "Litespeed", "Look", "Lotus", "Mercian", "Miyamura Gravel", "Open", "Quintana Roo", "Redland", "Riva", "Rose", "Sava", "Sundown", "Time", "Trinx", "Trust", "Velorbis", "Vicinitech", "Victory", "Eddy Merckx", "Salsa", "Surly", "Soma", "Diamondback", "Dahon", "Yeti"
  # ].sort_by { |frame_brands| frame_brands }

  # road_frame_sizes = ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  # mtb_dirt_frame_sizes = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "S1", "S2", "S3", "S4", "S5", "S6", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
  # rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
  # shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  # battery_capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]

  # ProductTypeAttribute.create!(product_type: frame, name: "frame_brand", kind: "multiple_choices", options: frame_brands, prompt: "Marca do quadro" )
  # ProductTypeAttribute.create!(product_type: frame, name: "frame_material", kind: "multiple_choices", options: materials, prompt: "Material do quadro" )
  # ProductTypeAttribute.create!(product_type: frame, name: "frame_size", kind: "multiple_choices", options: road_frame_sizes || mtb_dirt_frame_sizes, prompt: "Tamanho do quadro")
  # ProductTypeAttribute.create!(product_type: frame, name: "suspension_type", kind: "multiple_choices", options: ["no_suspension", "hardtail", "full_suspension"], prompt: "Tipo de suspensão")
  # ProductTypeAttribute.create!(product_type: frame, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso da suspensão traseira")
  # ProductTypeAttribute.create!(product_type: frame, name: "bike_type", kind: "multiple_choice", options: ["Bike", "E-Bike"], prompt: "Tipo de bike")
  # ProductTypeAttribute.create!(product_type: frame, name: "battery_capacity", kind: "multiple_choice", options: battery_capacities, prompt: "Capacidade da bateria") # se for e-bike
  # ProductTypeAttribute.create!(product_type: frame, name: "battery_cycles", kind: "text", options: nil, prompt: "Ciclos da bateria") # se for e-bike ?? option nil ?
  # ProductTypeAttribute.create!(product_type: frame, name: "motor_mileage", kind: "text", options: "", prompt: "KM do motor") # se for e-bike ???? option "" ?
  # ProductTypeAttribute.create!(product_type: frame, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Medida do shock") # caso possam ser opcionais os atributos


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # # road_brake_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "Outro"]
  # # mtb_dirt_urban_brake_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "Outro"]
  # brake_types = ["v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake" ]

  # ProductTypeAttribute.create!(product_type: brake, name: "brake_type", kind: "multiple_choice", options: brake_types, prompt: "Tipo de freio" )
  # ProductTypeAttribute.create!(product_type: brake, name: "disc_include", kind: "multiple_choice", options: ["Sim", "Não"], prompt: "Acompanha Disco?") # se for hidraulico ou mecanico à disco
  # ProductTypeAttribute.create!(product_type: brake, name: "brake_disc_size", kind: "multiple_choice", options: ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ], prompt: "Tamanho do disco")  # se acompanhar disco

  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RIM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # wheel_sizes = ["16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]

  # ProductTypeAttribute.create!(product_type: rim, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")
  # ProductTypeAttribute.create!(product_type: rim, name: "rim_material", kind: "multiple_choice", options: materials, prompt: "Material")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HANDLEBAR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # handlebar_sizes_mtb_dirt_urban_infant = ["660 mm","680 mm", "690 mm", "700 mm", "710 mm", "720 mm", "730 mm", "740 mm", "750 mm", "760 mm", "770 mm", "780 mm", "790 mm", "800 mm", "810 mm", "820 mm", "other"]
  # handlebar_sizes_road = ["360 mm", "380 mm", "400 mm", "420 mm", "440 mm", "460 mm", "other"]
  # handlebar_diameters = ["25,4 mm", "31,8 mm", "other"]
  # handlebar_drops = ["130 mm", "140 mm", "150mm", "160mm", "other"]

  # ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_size", kind: "multiple_choice", options: handlebar_sizes, prompt: "Tamanho" ) # opçõs de acordo com categoria #???
  # ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_diameter", kind: "multiple_choice", options: handlebar_diameters, prompt: "Diâmetro") #???
  # ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_drop", kind: "multiple_choice", options: handlebar_drops, prompt: "Drop") #??? perguntar se for categoria road
  # ProductTypeAttribute.create!(product_type: handlebar, name: "handlebar_material", kind: "multiple_choice", options: materials, prompt: "Material") #???


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # front_suspension_travels = ["80mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  # # mtb_dirt_urban_front_suspension_models = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "FOX 30", "FOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]

  # ProductTypeAttribute.create!(product_type: front_suspension, name: "front_suspension_travel", kind: "multiple_choice", options: front_suspension_travels, prompt: "Curso da suspensão dianteira")
  # ProductTypeAttribute.create!(product_type: front_suspension, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_SUSPENSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # shock_sizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  # # rear_suspension_travels = ["80mm", "100mm", "110mm", "120mm", "130mm", "140mm", "150mm", "170mm", "180mm", "160mm", "200mm", "other"]
  # # mtb_dirt_urban_rear_suspension_models = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "ROCKSHOX VIVID", "other"]

  # ProductTypeAttribute.create!(product_type: rear_suspension, name: "shock_size", kind: "multiple_choice", options: shock_sizes, prompt: "Medida do Shock")
  # # ProductTypeAttribute.create!(product_type: rear_suspension, name: "rear_suspension_travel", kind: "multiple_choice", options: rear_suspension_travels, prompt: "Curso da supensão traseira" )

  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< WHEEL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # ProductTypeAttribute.create!(product_type: wheel, name: "wheel_size", kind: "multiple_choice", options: wheel_sizes, prompt: "Tamanho da roda")
  # ProductTypeAttribute.create!(product_type: wheel, name: "wheel_material", kind: "multiple_choice", options: materials, prompt: "Material da roda")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RELATION KIT/COMPLETE GROUP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # front_gears_options= [0, 1, 2, 3 ]
  # rear_gears_options= [0, 1, 7, 8, 9, 10, 11, 12 ]

  # ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "rear_or_front_and_rear_derailleur", kind: "multiple_choice", options: ["front_and_rear", "rear"], prompt: "Tipo de relação")
  # ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "front_derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas (dianteiro)") #condicionada ao tipo
  # ProductTypeAttribute.create!(product_type: relation_kit_complete_group, name: "rear_derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de velocidades (traseiro)")  #condicionada ao tipo

  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # # road_front_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
  # # mtb_dirt_urban_front_derailleur_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]
  # front_gears_options= [0, 1, 2, 3 ]

  # ProductTypeAttribute.create!(product_type: front_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas")


  # # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR_DERAILLEUR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # # road_rear_derailleur_models = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  # # mtb_dirt_urban_rear_derailleur_models = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]
  # rear_gears_options = [0, 1, 7, 8, 9, 10, 11, 12 ]

  # ProductTypeAttribute.create!(product_type: rear_derailleur, name: "derailleur_velocities", kind: "multiple_choice", options: (1..12).to_a, prompt: "Número de velocidades")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SEAT_POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # seat_post_types = ["retractable", "rigid"]
  # seat_post_travels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]
  # seat_post_diameter = ["25.4mm", "27.2 mm", "30.9mm", "31.6mm", "34.9mm", "other" ]


  # ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_type", kind: "multiple_choice", options: seat_post_types, prompt: "Tipo do Canote")
  # ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_travel", kind: "multiple_choice", options: seat_post_travels, prompt: "Curso do Canote")
  # ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_material", kind: "multiple_choice", options: materials, prompt: "Material") # só rígido
  # ProductTypeAttribute.create!(product_type: seat_post, name: "seat_post_diameter", kind: "multiple_choice", options: seat_post_diameter, prompt: "Diâmetro")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CRANKSET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # lengths = ["170mm", "172,5mm", "175mm", "other"]
  # crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28", "other" ]
  # ProductTypeAttribute.create!(product_type: crankset, name: "crankset_crowns", kind: "multiple_choice", options: crowns, prompt: "Tamanho das coroas" )
  # ProductTypeAttribute.create!(product_type: crankset, name: "crankset_length", kind: "multiple_choice", options: lengths, prompt: "Comprimento")
  # ProductTypeAttribute.create!(product_type: crankset, name: "crankset_material", kind: "multiple_choice", options: materials, prompt: "Material")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CHAINRING >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # crowns = ["30", "32", "34", "36-22", "36-24", "36-26", "38-24", "38-26", "38-28", "39-26", "40-30-22", "42-32-22", "42-34-24", "44-32-22", "46-33", "48-35", "50-34", "50-37", "52-36", "53-39", "34-50", "28-28-48", "48-38-28", "other" ]
  # ProductTypeAttribute.create!(product_type: chainring, name: "chainring_crowns", kind: "multiple_choice", options: crowns, prompt: "Tamanho das coroas" )


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BATTERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # capacities = ["320 Wh", "500 Wh", "625 Wh", "700 Wh", "other"]

  # ProductTypeAttribute.create!(product_type: battery, name: "battery_capacity", kind: "multiple_choice", options: capacities, prompt: "Capacidade")
  # ProductTypeAttribute.create!(product_type: battery, name: "battery_cycles", kind: "text", options: nil, prompt: "Ciclos da bateria")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FRONT SHIFTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  # front_gears_options= [0, 1, 2, 3 ]
  # ProductTypeAttribute.create!(product_type: front_shifter, name: "derailleur_velocities", kind: "multiple_choice", options: front_gears_options, prompt: "Número de coroas")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< REAR SHIFTER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#
  # rear_gears_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

  # ProductTypeAttribute.create!(product_type: rear_shifter, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de valocidades")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CASSETTE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # rear_gears_options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

  # ProductTypeAttribute.create!(product_type: cassete, name: "derailleur_velocities", kind: "multiple_choice", options: rear_gears_options, prompt: "Número de velocidades")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BRAKE DISC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#

  # disc_sizes = ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ]

  # ProductTypeAttribute.create!(product_type: brake_disc, name: "disc_size", kind: "multiple_choice", options: disc_sizes, prompt: "Tamanho do disco")


  # #<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FORK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#


  # ProductTypeAttribute.create!(product_type: fork, name: "fork_material", kind: "multiple_choice", options: materials, prompt: "Material")
