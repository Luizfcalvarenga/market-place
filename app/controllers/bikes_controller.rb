class BikesController < ApplicationController


  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!

  def index
    @bikes = Bike.all
    @bikes = @bikes.where(modality: params[:modality]) if params[:modality].present?

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
    @services = Service.all
    if current_user.present?
      @user = current_user
    end

    skip_authorization

    respond_to do |format|
      format.json { render json: {
        categories: @categories,
        user: @user,
        services: @services
      } }
    end
  end

  def direct_links
    @current_filters = params[:query]
    @bikes = Bike.all
    @bikes = @bikes.where(:modality => @current_filters[:modality]) if @current_filters[:modality]
    # @bikes = @bikes.where(:fuel => @current_filters[:fuel]) if @current_filters[:fuel]
    #etc
  end

  private


  def bike_params
    params.require(:bike).permit(
      :user_id,
      :category_id,
      :modality,
      :locality,
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
      :structural_visual_condition,
      :operating_condition,
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
      :motor,
      :mileage,
      :battery_cycle,
      photos: []
    )
  end
end
