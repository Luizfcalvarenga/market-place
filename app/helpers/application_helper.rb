module ApplicationHelper


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
end
