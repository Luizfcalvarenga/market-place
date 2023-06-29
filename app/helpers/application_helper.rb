module ApplicationHelper
  include ActionView::Helpers::NumberHelper


  def display_price_in_cents(value)
    number_to_currency(value/100, :unit => "R$ ", :separator => ",", :delimiter => ".")
  end


  def mobile_device?
    if session[:mobile_param]
      session[:mobile_param] == "1"
    else
      request.user_agent =~ /Mobile|webOS/
    end
  end

  def dictionary
    {
      "mountain_bike"  => "Mountain Bike",
      "dirt_street"  => "Dirt",
      "road"  => "Road",
      "urban"  => "Urbana",
      "infant"  => "Infantil",

      "downhill"  => "Downhill",
      "enduro"  => "Enduro",
      "gravel"  => "Gravel",
      "speed"  => "Speed",
      "trail"  => "Trail",
      "xc_cross_country"  => "XC Cross Country",
      "street_bmx"  => "Street BMX",
      "race_bmx"  => "Race BMX",
      "big_wheel_bmx"  => "Big Wheel BMX",
      "dirt_jump"  => "Dirt Jump",
      "speed_performance"  => "Speed Performance",
      "triathlon"  => "Triathlon",
      "ciclocross"  => "Ciclocross",
      "cicloviagem"  => "Cicloviagem",

      "aluminum"  => "Alumínio",
      "carbon"  => "Carbono",
      "carbon_aluminum_chainstay"  => "Carbono/Aumínio (Chainstay)",
      "other"  => "Outro",


      "v_brake"  => "V-Brake (frenagem no aro)",
      "hydraulic_disc"  => "À Disco - Hidráulico",
      "mechanical_disc"  => "À Disco - Mecânico",
      "coaster_brake"  => "Contra pedal",

      "no_suspension"  => "Sem Suspensão",
      "hardtail"  => "Hardtail",
      "full_suspension"  => "Full Suspension",

      "retractable"  => "Retrátil",
      "rigid"  => "Rigido",

      "used"  => "Usada",
      "new"  => "Nova",

      "e-bike"  => "E-Bike",
      "bike"  => "Bike",

      "bad" => "Ruim",
      "reasonable" => "Razoável",
      "good" => "Bom",
      "excellent" => "Ótimo",

      "receipt" => "Nota Fiscal",
      "import_document" => "Documento de Importação",
      "foreign_tax_coupon" => "Cupom Fiscal Estrangeiro",
      "no_documentation" => "Sem Documento",
      "foreign_tax_coupon_and_import_document" => "Cupom Fiscal Estrangeiro + Documento de Importação",
    }
  end
end
