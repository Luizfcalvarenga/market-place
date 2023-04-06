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
        @products = @products.where(category:  Category.where(name: params[:categories].split(","))) if params[:categories].present?
        @products = @products.where(state:  State.where(name: params[:state])) if params[:state].present?
        @products = @products.where(city:  City.where(name: params[:city])) if params[:city].present?
        @products = @products.where(modality: params[:modalities].split(",")) if params[:modalities].present?
        @products = @products.where(condition: params[:condition]) if params[:condition].present?
        @products = @products.where(product_type_id: ProductType.where(prompt: params[:product_types].split(","))) if params[:product_types].present?
        @products = @products.where(brand: params[:brands].split(",")) if params[:brands].present?
        @products = @products.where(model: params[:models].split(",")) if params[:models].present?
        @products = @products.where('products.price_in_cents BETWEEN ? AND ?', params[:min_price], params[:max_price]).order(price_in_cents: :asc) if params[:min_price].present? && params[:max_price].present?
        @products = @products.where('products.price_in_cents >= ?', params[:min_price]).order(price_in_cents: :asc) if params[:min_price].present?
        @products = @products.where('products.price_in_cents BETWEEN ? AND ?', 0, params[:max_price]).order(price_in_cents: :asc) if params[:max_price].present?
        @products = @products.where('year::integer BETWEEN ? AND ?', params[:min_year], params[:max_year]).order(year: :asc) if params[:min_year].present? && params[:max_year].present?
        @products = @products.where('year::integer BETWEEN ? AND ?', params[:min_year], Date.today.year).order(year: :asc) if params[:min_year].present?
        @products = @products.where('year::integer BETWEEN ? AND ?', 0, params[:max_year]).order(year: :asc) if params[:max_year].present?
        @products = @products.where('products.name @@ ?', params[:name]) if params[:name].present?
        @products = @products.where(verified: params[:verified]) if params[:verified].present?
        @products = @products.joins(:product_attributes).where(product_attributes: {value: params[:clothe_sizes].split(",")}) if params[:clothe_sizes].present?
        @products = @products.where(product_type_id: (1..40).to_a) if params[:products_components].present?
        @products = @products.where(product_type_id: (41..49).to_a) if params[:products_accessories].present?
        @products = @products.where(product_type_id: (50..68).to_a) if params[:products_clothes].present?
        @products = @products.joins(:product_attributes).where(product_attributes: {value: params[:components_attributes_values].split(",")}).uniq if params[:components_attributes_values].present?
        @products = @products.where(product_type_id: params[:product_type_id]).joins(:product_attributes).where(value: params[:product_attribute_value]) if params[:product_attribute_value].present?
        @products = ProductAttribute.where(value: params[:product_attribute_value]).map { |value| value.product } if params[:product_attribute_value].present?

      end

      def show
        @product = Product.find(params[:id])
        skip_authorization
        @product_attributes =  @product.product_attributes
        @product_type_attributes = ProductTypeAttribute.where(product_type: @product.product_type)
        @present_ids = Product.joins(:advertisement).where(advertisements: {status: "approved"}).pluck(:id)
        @state = @product.state.acronym
        @city = @product.city.name
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
              photo_name =  photo.original_filename
              photo_content_type =  photo.content_type
              file_path_to_save_to = "#{Rails.root}/tmp/#{photo.original_filename}"
              FileUtils.cp(photo.tempfile.path, file_path_to_save_to)
              UploadProductPhotosJob.perform_later(@product, file_path_to_save_to, photo_name, photo_content_type)
            end
          end
          if params[:product][:productAttributes].present?
            @product_attributes = params[:product][:productAttributes].each do |key, value|
              ProductAttribute.create(product: @product, product_type_attribute: ProductTypeAttribute.find_by(name: key, product_type: @product.product_type), value: value)
            end
          end
          if params[:advertisement].present?
            @coupon_code = params[:advertisement][:discount_coupon]
          end
          @service = AdvertisementGenerator.new(@product, @coupon_code)
          @service.call()
          if @product.advertisement.present?  && @service.errors.blank?
            render json: { success: true, product: @product, product_attributes: @product_attributes, advertisement: @product.advertisement, photos: @photos, redirect_url: advertisement_invoice_path(@product.advertisement) }
          else
            render json: { success: false, errors: {product: @product.errors, coupon: @service.errors}}
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
        @state = @product.state.acronym
        @city = @product.city.name
        @maped_cities = City.where(state_id: @product.state_id)
        @photos = @product.photos.map(&:url)
        if @product.product_attributes.present?
          @product.product_attributes.each { |product_attribute|
            @product_attributes[(ProductTypeAttribute.find_by(id: product_attribute.product_type_attribute_id)).name] = product_attribute.value
          }
        end
        render json: { product: @product, product_attributes: @product_attributes, category: @category, state: @state, city: @city, photos: @photos, maped_cities: @maped_cities }
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
          if params[:product][:photos].present?
            @product.photos.purge
            params[:product][:photos].each do | photo |
              photo_name =  photo.original_filename
              photo_content_type =  photo.content_type
              file_path_to_save_to = "#{Rails.root}/tmp/#{photo.original_filename}"
              FileUtils.cp(photo.tempfile.path, file_path_to_save_to)
              UploadProductPhotosJob.perform_later(@product, file_path_to_save_to, photo_name, photo_content_type)
            end
          end
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
        params.require(:product).permit(
          :user_id,
          :category_id,
          :name,
          :modality,
          :product_type_id,
          :brand,
          :model,
          :description,
          :price_in_cents,
          :quantity,
          :year,
          :city_id,
          :state_id,
          :documentation_type,
          :condition,
          :product_condition_status,
          :product_condition_description
          # photos: []
        )
      end

      def product_attribute_params
        params.require(:product_attribute).permit(:value)

      end

    end
  end
end
