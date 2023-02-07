module Api
  module V1
    class BikesController < Api::V1::BaseController
      skip_after_action :verify_authorized, except: :index
      skip_after_action :verify_policy_scoped, only: :index
      skip_before_action :authenticate_user!

      def index
        @bikes = Bike.joins(:advertisement).where(advertisements: {status: "approved"}).order(created_at: :desc)

        # @bikes = @bikes.where(category:  Category.where(name: params[:category])) if params[:category].present?
        @bikes = @bikes.where(category:  Category.where(name: params[:categories].split(","))) if params[:categories].present?
        @bikes = @bikes.where(modality: params[:modalities].split(",")) if params[:modalities].present?
        @bikes = @bikes.where(state:  State.where(name: params[:state])) if params[:state].present?
        @bikes = @bikes.where(city:  City.where(name: params[:city])) if params[:city].present?
        @bikes = @bikes.where(bike_type: params[:bike_type]) if params[:bike_type].present?
        @bikes = @bikes.where('bikes.price_in_cents BETWEEN ? AND ?', params[:min_price], params[:max_price]).order(price_in_cents: :asc) if params[:min_price].present? && params[:max_price].present?
        @bikes = @bikes.where('bikes.price_in_cents >= ?', params[:min_price]).order(price_in_cents: :asc) if params[:min_price].present?
        @bikes = @bikes.where('bikes.price_in_cents BETWEEN ? AND ?', 0, params[:max_price]).order(price_in_cents: :asc) if params[:max_price].present?
        @bikes = @bikes.where(bike_condition: params[:condition]) if params[:condition].present?
        @bikes = @bikes.where('year::integer BETWEEN ? AND ?', params[:min_year], params[:max_year]).order(year: :asc) if params[:min_year].present? && params[:max_year].present?
        @bikes = @bikes.where('year::integer BETWEEN ? AND ?', params[:min_year], Date.today.year).order(year: :asc) if params[:min_year].present?
        @bikes = @bikes.where('year::integer BETWEEN ? AND ?', 0, params[:max_year]).order(year: :asc) if params[:max_year].present?
        @bikes = @bikes.where(bike_type: params[:bike_type]) if params[:bike_type].present?
        @bikes = @bikes.where(frame_size: params[:frame_sizes].split(",")) if params[:frame_sizes].present?
        @bikes = @bikes.where(frame_material: params[:frame_materials].split(",")) if params[:frame_materials].present?
        @bikes = @bikes.where(frame_brand: params[:frame_brands].split(",")) if params[:frame_brands].present?
        @bikes = @bikes.where(suspension_type: params[:suspension_types].split(",")) if params[:suspension_types].present?
        @bikes = @bikes.where(front_suspension_travel: params[:front_suspension_travels].split(",")) if params[:front_suspension_travels].present?
        @bikes = @bikes.where(rear_suspension_travel: params[:rear_suspension_travels].split(",")) if params[:rear_suspension_travels].present?
        @bikes = @bikes.where(front_suspension_model: params[:front_suspension_models].split(",")) if params[:front_suspension_models].present?
        @bikes = @bikes.where(rear_suspension_model: params[:rear_suspension_models].split(",")) if params[:rear_suspension_models].present?



        # @bikes = @bikes.where(frame_brand: params[:frame_brand]) if params[:frame_brand].present?
        @bikes = @bikes.where(number_of_front_gears: params[:number_of_front_gears]) if params[:number_of_front_gears].present?
        @bikes = @bikes.where(number_of_rear_gears: params[:number_of_rear_gears]) if params[:number_of_rear_gears].present?
        @bikes = @bikes.where(font_derailleur_model: params[:font_derailleur_model]) if params[:font_derailleur_model].present?
        @bikes = @bikes.where(rear_derailleur_model: params[:rear_derailleur_model]) if params[:rear_derailleur_model].present?
        @bikes = @bikes.where(brake_type: params[:brake_type]) if params[:brake_type].present?
        @bikes = @bikes.where(brake_disc_size: params[:brake_disc_size]) if params[:brake_disc_size].present?
        @bikes = @bikes.where(brake_model: params[:brake_model]) if params[:brake_model].present?
        @bikes = @bikes.where(rim_size: params[:rim_size]) if params[:rim_size].present?
        @bikes = @bikes.where(seat_post_type: params[:seat_post_type]) if params[:seat_post_type].present?
        @bikes = @bikes.where(seat_post_travel: params[:seat_post_travel]) if params[:seat_post_travel].present?
        @bikes = @bikes.where('seat_post_model @@ ?', params[:seat_post_model]) if params[:seat_post_model].present?
        @bikes = @bikes.where(battery: params[:battery]) if params[:battery].present?
        @bikes = @bikes.where('battery_cycles BETWEEN ? AND ?', 0, params[:battery_cycles]) if params[:battery_cycles].present?
        @bikes = @bikes.where('mileage BETWEEN ? AND ?', 0, params[:mileage]) if params[:mileage].present?
        @bikes = @bikes.where('model @@ ?', params[:model]) if params[:model].present?
        @bikes = @bikes.where('crankset @@ ?', params[:crankset]) if params[:crankset].present?
        @bikes = @bikes.where('chain @@ ?', params[:chain]) if params[:chain].present?
        @bikes = (@bikes.where('front_hub_model @@ ?', params[:hub])  || @bikes.where('rear_hub_model @@ ?', params[:hub]) )if params[:hub].present?
        @bikes = (@bikes.where('front_rim_model @@ ?', params[:rim])  || @bikes.where('rear_rim_model @@ ?', params[:rim]) )if params[:rim].present?
        @bikes = (@bikes.where('front_tyre_model @@ ?', params[:tyre])  || @bikes.where('rear_tyre_model @@ ?', params[:tyre]) )if params[:tyre].present?
        @bikes = @bikes.where('stem @@ ?', params[:stem]) if params[:stem].present?
        @bikes = @bikes.where('handlebar @@ ?', params[:handlebar]) if params[:handlebar].present?
        @bikes = @bikes.where(verified: params[:verified]) if params[:verified].present?

      end

      def show
        @bike = Bike.find(params[:id])
        skip_authorization
        @category = Category.find_by(id: @bike.category)
        @state = @bike.state.acronym
        @city = @bike.city.name
        @present_ids = Bike.joins(:advertisement).where(advertisements: {status: "approved"}).pluck(:id)
        @current_user = user_signed_in
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
          if params[:advertisement].present?
            @coupon_code = params[:advertisement][:discount_coupon]
          end
          @service = AdvertisementGenerator.new(@bike, @coupon_code)
          @service.call()
          if @bike.advertisement.present? &&  @service.errors.blank?
            render json: { success: true, bike: @bike, photos: @photos, advertisement: @bike.advertisement, redirect_url: advertisement_path(@bike.advertisement) }
          else
            render json: { success: false, errors: {bike: @bike.errors, coupon: @service.errors}}
          end
        else
          render json: { success: false, errors: {bike: @bike.errors}}
        end
      end

      def edit
        @bike = Bike.find(params[:id])
        authorize @bike
        @category = @bike.category.name
        @modalities = @bike.category.modalities
        @state = @bike.state.acronym
        @city = @bike.city.name
        render json: { bike: @bike, category: @category, modalities: @modalities, state: @state, city: @city }
      end

      def update
        @bike = Bike.find(params[:id])
        authorize @bike
        if @bike.update(bike_params)
          @advertisement = Advertisement.where(advertisable: @bike).first
          @advertisable = @bike
          AdvertisementUpdater.new(@advertisement, @advertisable).call
          if @advertisement.update(status: "waiting_review")
            render json: { success: true, bike: @bike, redirect_url: bike_path(@bike)}
          else
            render json: { success: false, errors: {}}, status: 422
          end
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
          :state_id,
          :city_id,
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
          :mileage,
          :battery_cycles,
          :pedals,

          photos: []
        )
      end

      def user_signed_in
        current_user.present?
      end
    end
  end
end
