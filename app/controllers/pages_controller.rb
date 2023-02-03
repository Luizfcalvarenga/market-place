class PagesController < ApplicationController
  after_action :set_status
  skip_before_action :authenticate_user!, only: [:home, :new_announce, :search]

  def home
  end

  def new_announce
  end
        # OR product.city.name @@ :query
        # OR product.city.name @@ :query

  def search
    if params[:query].present?
      product_sql_query = <<~SQL
        brand @@ :query
        OR model @@ :query
        OR products.name @@ :query
        OR product_types.prompt @@ :query
        OR description @@ :query
        OR cities.name @@ :query

      SQL
      @products = Product.joins(:advertisement).where(advertisements: {status: "approved"}).joins(:product_type).joins(:city).where(product_sql_query, query: "%#{params[:query]}%")

      bike_sql_query = <<~SQL
        frame_brand @@ :query
        OR bike_type @@ :query
        OR model @@ :query
        OR description @@ :query
        OR cities.name @@ :query

      SQL
      @bikes = Bike.joins(:advertisement).where(advertisements: {status: "approved"}).joins(:city).where(bike_sql_query, query: "%#{params[:query]}%")
    end

    respond_to do |format|
      format.html # Follow regular flow of Rails
      format.text { render partial: 'search_list.html', locals: { products: @products, bikes: @bikes } }
    end
  end


  private

  def set_status
    current_user.update!(status: User.statuses[:offline]) if current_user
  end

end
