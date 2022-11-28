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
          AdvertisementGenerator.new(@bike).call
        else
          render json: { success: false, errors: {bike: @bike.errors}}
        end
      end

      def edit
        @bike = Bike.find(params[:id])
        authorize @bike
        @category = @bike.category.name
        @modalities = @bike.category.modalities

        render json: { bike: @bike, category: @category, modalities: @modalities }
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
          :rear_rim_model,
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
          :battery_cycles,
          :pedals,
          photos: []
        )
      end
    end
  end
end
