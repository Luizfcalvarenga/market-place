class ProductsController < ApplicationController
  skip_after_action :verify_authorized, except: [:index, :show]
  skip_after_action :verify_policy_scoped, only: [:index, :show]

  skip_before_action :authenticate_user!

  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
    skip_authorization
  end

  def new
    @product = Product.new
    skip_authorization
    @product_types = ProductType.all
    @categories = Category.all
  end

  def create
    @product = Product.new(product_params)
    skip_authorization
    @product_types = ProductType.all
    @categories= Category.all
    if @product.save
      redirect_to product_path(@product)
    else
      render :new
    end
  end

  def get_information_for_new_product
    @product_types = ProductType.all
    @categories = Category.all
    if current_user.present?
      @user = current_user
    end


    skip_authorization

    respond_to do |format|
      format.json { render json: {
        types_of_product: @product_types,
        categories: @categories,
        user: @user
      } }
    end
  end





  private

  def product_params
    params.require(:product).permit(:user_id, :category_id, :modality, :product_type_id, :brand, :name, :description, :price_in_cents, :quantity)
  end
end
