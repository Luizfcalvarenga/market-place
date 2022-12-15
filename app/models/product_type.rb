class ProductType < ApplicationRecord
  has_many :product_type_attributes
  has_many :products

  PRODUCT_TYPE_OPTIONS = {
    battery: "Bateria",
    brake: "Freio",
    brake_levers: "Manete de Freio",
    cassete: "Cassete",
    chain: "Corrente",
    chainring: "Coroa",
    crankset: "Pedivela",
    fender: "Paralama",
    frame: "Quadro",
    front_derailleur: "Transmissão Dianteira",
    rear_derailleur: "Transmissão Traseira",
    front_shifter: "Trocador Dianteiro",
    rear_shifter: "Trocador Draseiro",
    front_suspension: "Suspensão Dianteira",
    full_wheel: "Roda Completa",
    grips: "Manopla",
    handlebar: "Guidão",
    headset: "Caixa de Direção",
    hub: "Cubo",
    pedals: "Pedais",
    rim: "Aro",
    saddle: "Selim",
    seat_pos: "Canote",
    spoke: "Raio",
    stem: "Mesa",
    tyre: "Pneu",
    car_accessories: "Acessórios para Carros",
    bike_accessories: "Acessórios para Bikes",
    training_accessories: "Acessórios para Treinar",
    pre_after_pedal_accessories: "Acessórios pré e pós Pedal",
    bretelle: "Bretelle",
    shorts: "Bermuda",
    inner_shorts: "Bermuda Interior",
    shirt: "Camisa",
    vest: "Colete",
    windbreaker: "Corta Vento",
    gloves: "Luvas",
    socks: "Meias",
    glasses: "Óculos",
    thermal_clothing: "Roupa Térmica",
    cap: "Boné",
    helmet: "Capacete",
    elbow_pad: "Cotoveleira",
    bottle: "Garrafa",
    knee_pad: "Joelheira",
    bottle_cage: "Suporte para Garrafa",
    hydration_backpack: "Mochila de Hidratação",
    fanny_pack: "Pochete",
    sneakers: "Sapatilha",
    air_bomb: "Bomba de Ar",
    lubricant: "Lubrificante",
    sealant: "Selante"
  }

  def name_display
    PRODUCT_TYPE_OPTIONS[name.to_sym]
  end


end
