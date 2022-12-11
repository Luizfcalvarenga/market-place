class PagesController < ApplicationController
  after_action :set_status
  skip_before_action :authenticate_user!, only: [:new_announce]

  def home
  end

  def new_announce
  end

  def search

    @products = Product.order(year: :desc)
    @bikes = Bike.order(year: :desc)

    if params[:query].present?
      # @bikes = PgSearch.multisearch(params[:query])
      # @products = PgSearch.multisearch(params[:query])


      product_sql_query = <<~SQL
        brand @@ :query
        OR model @@ :query
        OR locality @@ :query
        OR product_types.name @@ :query
      SQL
      @products = Product.joins(:product_type).where(product_sql_query, query: "%#{params[:query]}%")

      bike_sql_query = <<~SQL
        frame_brand @@ :query
        OR bike_type @@ :query
        OR locality @@ :query
      SQL
      @bikes = Bike.where(bike_sql_query, query: "%#{params[:query]}%")
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
