module Api
  module V1
    class ProductsController < Api::V1::BaseController
      skip_after_action :verify_authorized, except: [:index, :show]
      skip_after_action :verify_policy_scoped, only: [:index, :show]

      skip_before_action :authenticate_user!

      def index
        @products = Product.all
        @products = @products.where(category: params[:category]) if params[:category].present?
        @products = @products.where(modality: params[:modality]) if params[:modality].present?



        if params[:sort_by] == "price_ascending"
          @products = @products.order(price_in_cents: :asc)
        elsif params[:sort_by] == "price_descending"
          @products = @products.order(price_in_cents: :desc)
        end
      end


      def show
        @product = Product.find_by(id: params[:id])
        skip_authorization
      end

      def new
        @product = Product.new(product_params)
      end




      private

      def produc_params
        params.require(:product).permit(:user_id, :category_id, :modality, :product_type_id, :brand, :name, :description, :price_in_cents, :quantity)
      end
    end
  end
end
