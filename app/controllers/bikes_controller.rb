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
    @bike = Bike.find(params[:id])
    authorize @bike
    @bike.touch(:removed_at)
    if @bike.removed_at != nil
      flash[:alert] = "Seu Produto #{@bike.model} foi removida"
      redirect_to advertisements_path
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

  def get_bike_attributes_that_are_present_for_filter
    @bikes = Bike.joins(:advertisement).where(advertisements: {status: "approved"}).order(created_at: :desc)
    @categories = Category.where(id: @bikes.pluck(:category_id).uniq).compact_blank

    @road_modalities = @bikes.where(category: Category.where(name: "road")).where.not(modality: "null").pluck(:modality).uniq.compact_blank
    @mtb_modalities = @bikes.where(category: Category.where(name: "mountain_bike")).where.not(modality: "null").pluck(:modality).uniq.compact_blank
    @dirt_modalities = @bikes.where(category: Category.where(name: "dirt_street")).where.not(modality: "null").pluck(:modality).uniq.compact_blank
    @models = @bikes.where.not(model: "null").pluck(:model).uniq.compact_blank

    @frame_brands = @bikes.where.not(frame_brand: "null").pluck(:frame_brand).uniq.compact_blank
    @road_frame_sizes = @bikes.where(category: Category.where(name: "road")).where.not(frame_size: "null").pluck(:frame_size).uniq.compact_blank
    @mtb_dirt_infant_urban_frame_sizes = @bikes.where(category: Category.where(name: ["dirt_street", "mountain_bike", "urban", "infant"])).where.not(frame_size: "null").pluck(:frame_size).uniq.compact_blank
    @all_frame_sizes = @bikes.where.not(frame_size: "null").pluck(:frame_size).uniq.compact_blank
    @frame_materials = @bikes.where.not(frame_material: "null").pluck(:frame_material).uniq.compact_blank
    @suspension_types = @bikes.where.not(suspension_type: "null").pluck(:suspension_type).uniq.compact_blank
    @front_suspension_travels = @bikes.where.not(front_suspension_travel: "null").pluck(:front_suspension_travel).uniq.compact_blank
    @rear_suspension_travels = @bikes.where.not(rear_suspension_travel: "null").pluck(:rear_suspension_travel).uniq.compact_blank
    @front_suspension_models = @bikes.where.not(front_suspension_model: "null").pluck(:front_suspension_model).uniq.compact_blank
    @road_fork_materials = @bikes.where(category: Category.where(name: "road")).where.not(fork_material: "null").pluck(:fork_material).uniq.compact_blank
    @mtb_dirt_front_suspension_models = @bikes.where(category: Category.where(name:  ["dirt_street", "mountain_bike", "urban", "infant"])).where.not(rear_suspension_model: "null").pluck(:front_suspension_model).uniq.compact_blank
    @rear_suspension_models = @bikes.where.not(rear_suspension_model: "null").pluck(:rear_suspension_model).uniq.compact_blank
    @mtb_dirt_rear_suspension_models = @bikes.where(category: Category.where(name: ["dirt_street", "mountain_bike", "urban", "infant"])).where.not(rear_suspension_model: "null").pluck(:rear_suspension_model).uniq.compact_blank

    @number_of_front_gears = @bikes.pluck(:number_of_front_gears).uniq.compact_blank
    @number_of_rear_gears = @bikes.pluck(:number_of_rear_gears).uniq.compact_blank
    @mtb_dirt_front_derailleur_models = @bikes.where(category: Category.where(name:  ["dirt_street", "mountain_bike", "urban", "infant"])).where(front_derailleur_model: "null").pluck(:front_derailleur_model).uniq.compact_blank
    @mtb_dirt_rear_derailleur_models = @bikes.where(category: Category.where(name: ["dirt_street", "mountain_bike", "urban", "infant"])).where.not(rear_derailleur_model: "null").pluck(:rear_derailleur_model).uniq.compact_blank
    @road_front_derailleur_models = @bikes.where(category: Category.where(name: "road")).where.not(front_derailleur_model: "null").pluck(:front_derailleur_model).uniq.compact_blank
    @road_rear_derailleur_models = @bikes.where(category: Category.where(name: "road")).where.not(rear_derailleur_model: "null").pluck(:rear_derailleur_model).uniq.compact_blank
    @cranksets = @bikes.where.not(crankset: "null").pluck(:crankset).uniq.compact_blank
    @chains = @bikes.where.not(chain: "null").pluck(:chain).uniq.compact_blank


    @brake_types = @bikes.where.not(brake_type: "null").pluck(:brake_type).uniq.compact_blank
    @road_brake_models = @bikes.where(category: Category.where(name: "road")).where.not(brake_model: "null").pluck(:brake_model).uniq.compact_blank
    @mtb_dirt_brake_models = @bikes.where(category: Category.where(name: ["dirt_street", "mountain_bike", "urban", "infant"])).where.not(brake_model: "null").pluck(:brake_model).uniq.compact_blank
    @brake_disc_sizes = @bikes.where.not(brake_disc_size: "null").pluck(:brake_disc_size).uniq.compact_blank

    @rim_sizes = @bikes.where.not(rim_size: "null").pluck(:rim_size).uniq.compact_blank
    @wheel_materials = @bikes.where.not(wheel_material: "null").pluck(:wheel_material).uniq.compact_blank
    @rim_models = @bikes.where.not(front_rim_model: "null").where.not(rear_rim_model: "null").pluck(:front_rim_model, :rear_rim_model).flatten.uniq.compact_blank
    @tyre_models = @bikes.where.not(front_tyre: "null").where.not(rear_tyre: "null").pluck(:front_tyre, :rear_tyre).flatten.uniq.compact_blank
    @hub_models = @bikes.where.not(front_hub: "null").where.not(rear_hub: "null").pluck(:front_hub, :rear_hub).flatten.uniq.compact_blank

    @seat_post_types = @bikes.where.not(seat_post_type: "null").pluck(:seat_post_type).uniq.compact_blank
    @seat_post_travels = @bikes.where.not(seat_post_travel: "null").pluck(:seat_post_travel).uniq.compact_blank
    @seat_post_materials = @bikes.where.not(seat_post_material: "null").pluck(:seat_post_material).uniq.compact_blank
    @seat_post_models = @bikes.where.not(seat_post_model: "null").pluck(:seat_post_model).uniq.compact_blank


    @handlebar_models = @bikes.where.not(handlebar: "null").pluck(:handlebar).uniq.compact_blank
    @handlebar_materials = @bikes.where.not(handlebar_material: "null").pluck(:handlebar_material).uniq.compact_blank
    @stem_models = @bikes.where.not(stem: "null").pluck(:stem).uniq.compact_blank

    @batteries = @bikes.where.not(battery: "null").pluck(:battery).uniq.compact_blank



    skip_authorization
    respond_to do |format|
      format.json { render json: {
        categories: @categories,
        road_modalities: @road_modalities,
        mtb_modalities: @mtb_modalities,
        dirt_modalities: @dirt_modalities,
        models: @models,
        frame_brands: @frame_brands,
        road_frame_sizes: @road_frame_sizes,
        mtb_dirt_infant_urban_frame_sizes: @mtb_dirt_infant_urban_frame_sizes,
        all_frame_sizes: @all_frame_sizes,
        frame_materials: @frame_materials,
        suspension_types: @suspension_types,
        front_suspension_travels: @front_suspension_travels,
        mtb_dirt_front_suspension_models: @mtb_dirt_front_suspension_models,
        rear_suspension_travels: @rear_suspension_travels,
        front_suspension_models: @front_suspension_models,
        road_fork_materials: @road_fork_materials,
        mtb_dirt_front_suspension_models: @mtb_dirt_front_suspension_models,
        rear_suspension_models: @rear_suspension_models,
        mtb_dirt_rear_suspension_models: @mtb_dirt_rear_suspension_models,
        number_of_front_gears: @number_of_front_gears,
        number_of_rear_gears: @number_of_rear_gears,
        mtb_dirt_front_derailleur_models: @mtb_dirt_front_derailleur_models,
        mtb_dirt_rear_derailleur_models: @mtb_dirt_rear_derailleur_models,
        road_front_derailleur_models: @road_front_derailleur_models,
        road_rear_derailleur_models: @road_rear_derailleur_models,
        cranksets: @cranksets,
        chains: @chains,
        brake_types: @brake_types,
        road_brake_models: @road_brake_models,
        mtb_dirt_brake_models: @mtb_dirt_brake_models,
        brake_disc_sizes: @brake_disc_sizes,

        rim_sizes: @rim_sizes,
        wheel_materials: @wheel_materials,
        rim_models: @rim_models,
        tyre_models: @tyre_models,
        hub_models: @hub_models,

        seat_post_types: @seat_post_types,
        seat_post_travels: @seat_post_travels,
        seat_post_materials: @seat_post_materials,
        seat_post_models: @seat_post_models,

        handlebar_models: @handlebar_models,
        handlebar_materials: @handlebar_materials,
        stem_models: @stem_models,

        batteries: @batteries
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
