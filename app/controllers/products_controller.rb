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
    authorize @product
    # raise
  end

  def update
    @product = Product.find(params[:id])
    @product_attributes = ProductAttribute.where(product: @product)
    authorize @product

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

  def destroy
    @product = Product.find(params[:id])
    authorize @product
    @product.touch(:removed_at)
    if @product.removed_at.present?
      flash[:alert] = "Produto #{@product.name} removido "
      redirect_to advertisements_path
    else
      flash[:alert] = "Algo deu errado ao remover produto #{@product.name} "
      redirect_to advertisements_path
    end
  end

  def toggle_product_verify
    @product = Product.find(params[:product][:id])
    @advertisement = Advertisement.where(advertisable: @product).first
    authorize @product
    if @product.update(product_params)
      if @product.verified?
        redirect_to admin_advertisement_path(@advertisement)
        flash[:alert] = "Produto #{@product.name} verificado com sucesso"
      else
        redirect_to admin_advertisement_path(@advertisement)
        flash[:alert] = "Produto #{@product.name} removido verificação com sucesso"
      end
    else
      redirect_to admin_advertisement_path(@advertisement)
      flash[:alert] = "Algo deu errado ao Verificar produto"
    end
  end

  def get_product_attributes_that_are_present_for_filter
    @products = Product.joins(:advertisement).where(advertisements: {status: "approved"}).order(created_at: :desc)
    @products_component =  ProductType.where(id: @products.where(product_type_id: (1..40).to_a).pluck(:product_type_id).uniq).compact_blank
    @products_accessory = ProductType.where(id: @products.where(product_type_id: (41..49).to_a).pluck(:product_type_id).uniq).compact_blank
    @products_clothe = ProductType.where(id: @products.where(product_type_id: (50..68).to_a).pluck(:product_type_id).uniq).compact_blank

    @categories = Category.where(id: @products.pluck(:category_id).uniq).compact_blank
    @road_modalities = @products.where(category: Category.where(name: "road")).where.not(modality: "null").pluck(:modality).uniq.compact_blank
    @mtb_modalities = @products.where(category: Category.where(name: "mountain_bike")).where.not(modality: "null").pluck(:modality).uniq.compact_blank
    @dirt_modalities = @products.where(category: Category.where(name: "dirt_street")).where.not(modality: "null").pluck(:modality).uniq.compact_blank
    @models = @products.where.not(model: "null").pluck(:model).uniq.compact_blank
    @brands = @products.where.not(brand: "null").pluck(:brand).uniq.compact_blank



    @product_attributes =  ProductAttribute.where(product_id: @products.pluck(:id)).pluck( :value).uniq.compact_blank


    skip_authorization
    respond_to do |format|
      format.json { render json: {

        products_component: @products_component,
        products_accessory: @products_accessory,
        products_clothe: @products_clothe,
        categories: @categories,
        road_modalities: @road_modalities,
        mtb_modalities: @mtb_modalities,
        dirt_modalities: @dirt_modalities,
        models: @models,
        brands: @brands,
        product_attributes: @product_attributes
      } }
    end
  end

  private

  def product_params
    params.require(:product).permit(
      :user_id,
      :category_id,
      :name,
      :modality,
      :product_type_id,
      :brand,
      :model,
      :description,
      :price_in_cents,
      :quantity,
      :city_id,
      :state_id,
      :year,
      :documentation_type,
      :condition,
      :product_condition_status,
      :product_condition_description,
      :verified,
      photos: [])
  end
end
