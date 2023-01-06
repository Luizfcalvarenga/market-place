module Api
  module V1
    class ProductsController < Api::V1::BaseController
      skip_after_action :verify_authorized, except: [:index, :show]
      skip_after_action :verify_policy_scoped, only: [:index, :show]

      skip_before_action :authenticate_user!

      def index
        @user = current_user
        @product_types = ProductType.all
        @product_type_attributes = ProductTypeAttribute.all
        @products = Product.joins(:advertisement).where(advertisements: {status: "approved"}).order(created_at: :desc)

        @products = @products.where(category: Category.where(name: params[:category])) if params[:category].present?
        @products = @products.where(modality: params[:modality]) if params[:modality].present?
        @products = @products.where(product_type_id: params[:product_type_id]) if params[:product_type_id].present?
        @products = @products.where(product_type_: ProductType.where(name: params[:product_type_name])) if params[:product_type_name].present?

        @products = @products.where('products.price_in_cents BETWEEN ? AND ?', params[:min_price], params[:max_price]).order(price_in_cents: :asc) if params[:min_price].present? && params[:max_price].present?
        @products = @products.where('products.price_in_cents >= ?', params[:min_price]).order(price_in_cents: :asc) if params[:min_price].present?
        @products = @products.where('products.price_in_cents BETWEEN ? AND ?', 0, params[:max_price]).order(price_in_cents: :asc) if params[:max_price].present?

        @products = @products.where('year::integer BETWEEN ? AND ?', params[:min_year], params[:max_year]).order(year: :asc) if params[:min_year].present? && params[:max_year].present?
        @products = @products.where('year::integer BETWEEN ? AND ?', params[:min_year], Date.today.year).order(year: :asc) if params[:min_year].present?
        @products = @products.where('year::integer BETWEEN ? AND ?', 0, params[:max_year]).order(year: :asc) if params[:max_year].present?

        @products = @products.where(product_type_id: params[:product_type_id]).joins(:product_attributes).where(value: params[:product_attribute_value]) if params[:product_attribute_value].present?
        @products = ProductAttribute.where(value: params[:product_attribute_value]).map { |value| value.product } if params[:product_attribute_value].present?
        @products = ProductAttribute.where(value: params[:condition]).map { |value| value.product } if params[:condition].present?
        @products = @products.where(brand: params[:brand]) if params[:brand].present?
        @products = @products.where(model: params[:model]) if params[:model].present?
        @products = @products.where('locality @@ ?', params[:locality]) if params[:locality].present?
        @products = @products.where('products.name @@ ?', params[:name]) if params[:name].present?

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
            params[:product][:photos].each do | photo |
              @product.photos.attach(photo)
            end
          end
          if params[:product][:productAttributes].present?
            @product_attributes = params[:product][:productAttributes].each do |key, value|
              ProductAttribute.create(product: @product, product_type_attribute: ProductTypeAttribute.find_by(name: key, product_type: @product.product_type), value: value)
            end
          end
          AdvertisementGenerator.new(@product).call

          if @product.advertisement.present? || @product.photos.attach ||  (params[:product][:productAttributes].present? && (ProductAttribute.where(product: @product).count == params[:product][:productAttributes].keys.coun))
            render json: { success: true, product: @product, product_attributes: @product_attributes, photos: @photos, redirect_url: advertisement_path(@product.advertisement) }
          else
            render json: { success: false, errors: {product: @product.errors, product_attributes: @product_attributes.errors}}
          end
        else
          render json: { success: false, errors: {product: @product.errors} }
        end
      end

      def edit
        @product = Product.find(params[:id])
        authorize @product
        @product_attributes = {}
        @category = @product.category.name
        if @product.product_attributes.present?
          @product.product_attributes.each { |product_attribute|
            @product_attributes[(ProductTypeAttribute.find_by(id: product_attribute.product_type_attribute_id)).name] = product_attribute.value
          }
        end
        render json: { product: @product, product_attributes: @product_attributes, category: @category }
      end

      def update
        @product = Product.find(params[:id])
        @product_attributes = @product.product_attributes
        if params[:product][:productAttributes].present?
          params[:product][:productAttributes].each do |key, value|
            @product_attributes.find_by(product: @product, product_type_attribute: ProductTypeAttribute.find_by(name: key, product_type: @product.product_type)).update(value: value)
          end
        end
        authorize @product

        if @product.update(product_params) || @product_attributes.update(product_attribute_params)
          @advertisement = Advertisement.where(advertisable: @product).first
          @advertisable = @product
          AdvertisementUpdater.new(@advertisement, @advertisable).call
          if @advertisement.update(status: "waiting_review")
            render json: { success: true, product: @product, redirect_url: product_path(@product)}
          else
            render json: { success: false, errors: {}}, status: 422
          end
        else
          render json: { success: false, errors: {product: @product.error, product_attributes: @product_attributes.errors }}, status: 422
        end
      end

      private

      def product_params
        params.require(:product).permit(:user_id, :category_id, :name, :modality, :product_type_id, :brand, :model, :description, :price_in_cents, :quantity, :year, :locality, photos: [])
      end

      def product_attribute_params
        params.require(:product_attribute).permit(:value)

      end

    end
  end
end
