class BikesController < ApplicationController


  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!

  def index
  end

  def show
    @bike = Bike.find(params[:id])
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
    @bike = Bike.new
    skip_authorization
    @categories = Category.all
  end

  def create
    @bike = Bike.new(bike_params)
    skip_authorization
    @categories= Category.all

    if @bike.save
      redirect_to bike_path(@bike)
    else
      render :new
    end
  end

  def edit
    @bike = Bike.find(params[:id])
    authorize @bike
  end

  def update
    @bike = Bike.find(params[:id])
    authorize @bike

    if @bike.update(bike_params)
      render  @bike
    else
      redirect_to :edit
    end
  end

  def destroy
    @bike = Bike.find_by(params[:id])
    authorize @bike
    @bike.touch(:removed_at)
    if @bike.removed_at != nil
      flash[:alert] = "Seu Produto #{@bike.model} foi removida"
      redirect_to my_products_path
    end
  end

  def get_information_for_new_bike
    @categories = Category.all
    @states = State.all
    @cities = City.all
    if current_user.present?
      @user = current_user
    end
    skip_authorization
    respond_to do |format|
      format.json { render json: {
        categories: @categories,
        user: @user,
        states: @states,
        cities: @cities
      } }
    end
  end

  def get_attributes_that_are_present_for_filter
    @bikes = Bike.joins(:advertisement).where(advertisements: {status: "approved"}).order(created_at: :desc)
    # Category.where(id: Bike.joins(:advertisement).where(advertisements: {status: "approved"}).pluck(:category_id))
    @categories = Category.where(id: @bikes.pluck(:category_id).uniq)
    @road_modalities = @bikes.where(category: Category.where(name: "road")).pluck(:modality).uniq
    @mtb_modalities = @bikes.where(category: Category.where(name: "mountain_bike")).pluck(:modality).uniq
    @dirt_modalities = @bikes.where(category: Category.where(name: "dirt_street")).pluck(:modality).uniq
    @frame_brands = @bikes.pluck(:frame_brand).uniq
    @road_frame_sizes = @bikes.where(category: Category.where(name: "road")).pluck(:frame_size).uniq
    @mtb_dirt_infant_urban_frame_sizes = @bikes.where(category: Category.where(name: ["dirt_street", "mountain_bike", "urban", "infant"])).pluck(:frame_size).uniq
    @all_frame_sizes = @bikes.pluck(:frame_size).uniq
    @frame_materials = @bikes.pluck(:frame_material).uniq
    @suspension_types = @bikes.pluck(:suspension_type).uniq
    @front_suspension_travels = @bikes.pluck(:front_suspension_travel).uniq
    @rear_suspension_travels = @bikes.pluck(:rear_suspension_travel).uniq
    @front_suspension_models = @bikes.pluck(:front_suspension_model).uniq
    @road_fork_materials = @bikes.where(category: Category.where(name: "road")).pluck(:fork_material).uniq
    @mtb_dirt_front_suspension_models = @bikes.where.not(category: Category.where(name:  ["dirt_street", "mountain_bike", "urban", "infant"])).pluck(:front_suspension_model).uniq
    @rear_suspension_models = @bikes.pluck(:rear_suspension_model).uniq
    @mtb_dirt_rear_suspension_models = @bikes.where.not(category: Category.where(name: ["dirt_street", "mountain_bike", "urban", "infant"])).pluck(:rear_suspension_model).uniq








    skip_authorization
    respond_to do |format|
      format.json { render json: {
        categories: @categories,
        road_modalities: @road_modalities,
        mtb_modalities: @mtb_modalities,
        dirt_modalities: @dirt_modalities,
        frame_brands: @frame_brands,
        road_frame_sizes: @road_frame_sizes,
        mtb_dirt_infant_urban_frame_sizes: @mtb_dirt_infant_urban_frame_sizes,
        all_frame_sizes: @all_frame_sizes,
        frame_materials: @frame_materials,
        suspension_types: @suspension_types,
        front_suspension_travels: @front_suspension_travels,
        road_front_suspension_models: @road_front_suspension_models,
        mtb_dirt_front_suspension_models: @mtb_dirt_front_suspension_models,
        rear_suspension_travels: @rear_suspension_travels,
        front_suspension_models: @front_suspension_models,
        road_fork_materials: @road_fork_materials,
        mtb_dirt_front_suspension_models: @mtb_dirt_front_suspension_models,
        rear_suspension_models: @rear_suspension_models,
        mtb_dirt_rear_suspension_models: @mtb_dirt_rear_suspension_models,

      } }
    end
  end

  def toggle_bike_verify
    @bike = Bike.find(params[:bike][:id])
    @advertisement = Advertisement.where(advertisable: @bike).first
    authorize @bike
    if @bike.update(bike_params)
      if @bike.verified?
        redirect_to admin_advertisement_path(@advertisement)
        flash[:alert] = "Bike #{@bike.frame_brand} verificado com sucesso"
      else
        redirect_to admin_advertisement_path(@advertisement)
        flash[:alert] = "Bike #{@bike.frame_brand} removido verificação com sucesso"
      end
    else
      redirect_to admin_advertisement_path(@advertisement)
      flash[:alert] = "Algo deu errado ao Verificar bike"
    end
  end

  private

  def bike_params
    params.require(:bike).permit(
      :user_id,
      :category_id,
      :state_id,
      :city_id,
      :modality,
      :bike_type,
      :model,
      :description,
      :price_in_cents,
      :quantity,
      :year,
      :frame_brand,
      :frame_size,
      :frame_material,
      :number_of_front_gears,
      :number_of_rear_gears,
      :brake_type,
      :brake_disc_size,
      :suspension_type,
      :front_suspension_travel,
      :rear_suspension_travel,
      :seat_post_type,
      :seat_post_travel,
      :seat_post_model,
      :weight,
      :brake_model,
      :bike_condition,
      :bike_condition_status,
      :bike_condition_description,
      :documentation_type,
      :accessories,
      :accessories_description,
      :battery,
      :rim_size,
      :front_rim_model,
      :reaar_rim_model,
      :front_suspension_model,
      :rear_suspension_model,
      :front_derailleur_model,
      :rear_derailleur_model,
      :crankset,
      :chain,
      :front_hub,
      :rear_hub,
      :front_tyre,
      :rear_tyre,
      :handlebar,
      :stem,
      :mileage,
      :battery_cycle,
      :fork_material,
      :crankset_material,
      :handlebar_material,
      :wheel_material,
      :seat_post_material,
      :verified,
      photos: []
    )
  end
end
