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
    end
  end
end
