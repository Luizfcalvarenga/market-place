class BikesController < ApplicationController
  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!

  def index
    @bikes = Bike.all
  end

  def show
    @bike = Bike.find(params[:id])
  end

  def new
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
      :frame_material,
      :frame_size,
      :frame_material,
      :rim_size,
      :number_of_front_gears,
      :number_of_rear_gears,
      :brake_type,
      :suspension_type,
      :front_suspension_travel,
      :rear_suspension_travel,
      :seat_post_type,
      :seat_post_travel,
      :weight,
      :bike_conditions,
      :structural_visual_condition,
      :operating_condition,
      :documentation_type,
      :accessories,
      :battery,
      photos: []
    )
  end
end
