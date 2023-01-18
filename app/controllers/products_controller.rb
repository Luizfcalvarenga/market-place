class ProductsController < ApplicationController
  skip_after_action :verify_authorized, except: [:index, :show]
  skip_after_action :verify_policy_scoped, only: [:index, :show]

  skip_before_action :authenticate_user!


  def index
    @products = policy_scope(Product).order(created_at: :desc)
    @products = @products.where(product_type_id: params[:product_type_id]) if params[:product_type_id].present?
  end

  def show

    @product = Product.find(params[:id])
    skip_authorization
  end

  def new
    if current_user.blank?
      redirect_to new_user_session_path
      flash[:alert] = "você deve criar uma conta com documento e cep para anunciar."
    elsif
      current_user.document_number.blank? && current_user.cep.blank?
      redirect_to edit_profiles_path
      flash[:alert] = "você deve preencher seu documento e cep para anunciar."
    end

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


  def edit
    @product = Product.find(params[:id])
    @product_attributes = ProductAttribute.where(product: @product)
    skip_authorization
  end

  def update
    @product = Product.find(params[:id])
    @product_attributes = ProductAttribute.where(product: @product)
    skip_authorization

    if @product.update(product_params)
      render  @product
    else
      redirect_to :edit
    end
  end

  def destroy
    @product = Product.find(params[:id])
    authorize @product
    @product.touch(:removed_at)
    if @product.removed_at != nil
      flash[:alert] = "Seu Produto #{@product.name} foi removido"
      redirect_to my_products_path
    end
  end

  def my_products
    @user = current_user
    @products = Product.where(user: @user)
    @bikes = Bike.where(user: @user)
    skip_authorization
  end

  def get_information_for_new_product
    @product_types = ProductType.all
    @categories = Category.all
    @states = State.all
    @cities = City.all
    if current_user.present?
      @user = current_user
    end

    skip_authorization

    respond_to do |format|
      format.json { render json: {
        types_of_product: @product_types,
        categories: @categories,
        user: @user,
        states: @states,
        cities: @cities

      } }
    end
  end

  def search
    @current_filters = params[:filters]
    @products = Product.all
    @products = @products.where(:product_type_id => @current_filters[:product_type_id]) if @current_filters[:product_type_id]
  end

  private

  def product_params
    params.require(:product).permit(:user_id, :category_id, :name, :modality, :product_type_id, :brand, :model, :description, :price_in_cents, :quantity, :city_id, :state_id, :year, :documentation_type, :condition, photos: [])
  end
end
