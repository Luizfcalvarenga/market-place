module Api
  module V1
    class BikesController < Api::V1::BaseController
      skip_after_action :verify_authorized, except: :index
      skip_after_action :verify_policy_scoped, only: :index

      skip_before_action :authenticate_user!

      def index
        @bikes = Bike.all
        @bikes = @bikes.where(category: params[:category]) if params[:category].present?
        @bikes = @bikes.where("age <= ?", params[:max_age]) if params[:max_age].present?

        if params[:sort_by] == "age_ascending"
          @bikes = @bikes.order(age: :asc)
        elsif params[:sort_by] == "age_descending"
          @bikes = @bikes.order(age: :desc)
        elsif params[:sort_by] == "size_ascending"
          @bikes = @bikes.order(size: :asc)
        elsif params[:sort_by] == "size_descending"
          @bikes = @bikes.order(size: :desc)
        end
      end

      def show
        @bike = Bike.find(params[:id])
        skip_authorization
        @category = Category.find_by(id: @bike.category)
      end

      def new
        @bike = Bike.new
        skip_authorization
        @categories = Category.all
      end

      def create
        @bike = Bike.new(bike_params)
        skip_authorization
        @categories = Category.all

        if params[:bike][:accessories] === "Não"
          @bike.accessories = false
        else
          @bike.accessories = true
        end
        if @bike.save
          if params[:bike][:photos].present?
            params[:bike][:photos].each do | photo |
              @bike.photos.attach(photo)
            end
          end
          if @bike.photos.attach
            render json: { success: true, bike: @bike, photos: @photos, redirect_url: bike_path(@bike) }
          else
            render json: { success: false, errors: {bike: @bike.errors}}
          end
        else
          render json: { success: false, errors: {bike: @bike.errors}}
        end
      end

      def edit
        @bike = Bike.find(params[:id])
        authorize @bike
        @category = @bike.category.name
        render json: { bike: @bike, category: @category }
      end

      def update
        @bike = Bike.find(params[:id])
        authorize @bike
        if @bike.update(bike_params)
          render json: { success: true, bike: @bike, redirect_url: bike_path(@bike)}
        else
          render json: { success: false, errors: {bike: @bike.error }}, status: 422
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
          :weight,
          :bike_conditions,
          :structural_visual_condition,
          :operating_condition,
          :documentation_type,
          :accessories,
          :battery,
          :front_rim_size,
          :reaar_rim_size,
          :front_suspension_model,
          :rear_suspension_model,
          :front_derailleur_model,
          :rear_derailleur_model,
          :crankset,
          :chain,
          :brake_model,
          :front_hub,
          :rear_hub,
          :front_tyre,
          :rear_tyre,
          :handlebar,
          :stem,
          :motor,
          :mileage,
          :rim_size,
          :battery_cycle,
          photos: []
        )
      end
    end
  end
end
