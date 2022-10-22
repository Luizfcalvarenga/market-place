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
        @product = Product.find(params[:id])
        skip_authorization
        @product_attributes =  @product.product_attributes
        @product_type_attributes = ProductTypeAttribute.where(product_type: @product.product_type)
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
          if params[:product][:photos].present?
            # params[:product][:photos].each do |photo|
            @product.photos.attach(params[:product][:photos])
            # end
          end
          if params[:product][:productAttributes].present?
            @product_attributes = params[:product][:productAttributes].each do |key, value|
              ProductAttribute.create(product: @product, product_type_attribute: ProductTypeAttribute.find_by(name: key, product_type: @product.product_type), value: value)
            end
          end
          render json: { success: true, product: @product, product_attributes: @product_attributes, redirect_url: product_path(@product) }
        else
          render json: { success: false, errors: @product.errors }, status: 422
        end
      end


      def edit
        @product = Product.find(params[:id])
        authorize @product

        @product_attributes = {}
        @product.product_attributes.each { |product_attribute|
          @product_attributes[(ProductTypeAttribute.find_by(id: product_attribute.product_type_attribute_id)).name] = product_attribute.value
        }
        render json: { product: @product, product_attributes: @product_attributes }
      end


      def update
        @product = Product.find(params[:id])
        @product_attributes = @product.product_attributes
        if params[:product][:productAttributes].present?
          params[:product][:productAttributes].each do |key, value|
            ProductAttribute.update(value: value)
          end
        end
        authorize @product
        # if params[:product][:productAttributes].present?
        #   @product_attributes = params[:product][:productAttributes].each do |key, value|
        #     ProductAttribute.update(product: @product, product_type_attribute: ProductTypeAttribute.find_by(name: key, product_type: @product.product_type), value: value)
        #   end
        # end

        if @product.update(product_params) || @product_attributes.update(product_attributes_params)
          render json: { success: true, product: @product, redirect_url: product_path(@product)}
        else
          render json: { success: false, errors: {product: @product.error, product_attributes: @product_attributes.errors }}, status: 422
        end
      end

      private

      def product_params
        params.require(:product).permit(:user_id, :category_id, :modality, :product_type_id, :brand, :name, :description, :price_in_cents, :quantity)
      end

      def product_attributes_params
        params.require(:product_attributes).permit(:value)
      end
    end
  end
end
