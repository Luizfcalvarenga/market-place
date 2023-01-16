class PagesController < ApplicationController
  after_action :set_status
  skip_before_action :authenticate_user!, only: [:home, :new_announce, :search]

  def home
  end

  def new_announce
  end

  def search
    if params[:query].present?
      product_sql_query = <<~SQL
        brand @@ :query
        OR model @@ :query
        OR products.name @@ :query
        OR locality @@ :query
        OR product_types.prompt @@ :query
        OR description @@ :query
      SQL
      @products = Product.joins(:advertisement).where(advertisements: {status: "approved"}).joins(:product_type).where(product_sql_query, query: "%#{params[:query]}%")

      bike_sql_query = <<~SQL
        frame_brand @@ :query
        OR bike_type @@ :query
        OR model @@ :query
        OR locality @@ :query
        OR description @@ :query
      SQL
      @bikes = Bike.joins(:advertisement).where(advertisements: {status: "approved"}).where(bike_sql_query, query: "%#{params[:query]}%")
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
