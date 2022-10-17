module Api
  module V1
    class ProductsController < Api::V1::BaseController
      skip_after_action :verify_authorized, except: [:index, :show]
      skip_after_action :verify_policy_scoped, only: [:index, :show]

      skip_before_action :authenticate_user!

      def index
        @user = current_user
        @products = Product.where.not(user: @user)
        @products = @products.where(category: Category.where(name: params[:category])) if params[:category].present?
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
        @product = Product.new
        skip_authorization
        @product_types = ProductType.all
        @categories = Category.all
      end

      def create
        @product = Product.new(product_params)
        skip_authorization
        @product_types = ProductType.all
        @categories = Category.all


        if @product.save
          params[:product][:productAttributes].each do |key, value|
            ProductAttribute.create(product: @product, product_type_attribute: ProductTypeAttribute.find_by(name: key, product_type: @product.product_type), value: value)
          end
          render json: { success: true, product: @product, redirect_url: product_path(@product) }
        else
          render json: { success: false, error: @product.errors.messages }, status: 422
        end
      end

      def edit
        @product = Product.find_by(id: params[:id])
        @product_attributes = ProductAttribute.where(product: @product)
        skip_authorization
      end


      def update
        @product = Product.find_by(id: params[:id])
        @product_attributes = ProductAttribute.where(product: @product)
        skip_authorization

        if @product.update(product_params)
          render json: @product
        else
          render json: { error: @product.error.messages }, status: 422
        end
      end

      private

      def product_params
        params.require(:product).permit(:user_id, :category_id, :modality, :product_type_id, :brand, :name, :description, :price_in_cents, :quantity)
      end
    end
  end
end
