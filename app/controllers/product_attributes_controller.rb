class ProductAttributesController < ApplicationController


  def new
    @product_attribute = ProductAttribute.new
    skip_authorization
  end

  def create
    @product_attribute = ProductAttribute.new(product_params)
    skip_authorization

    if @product_attribute.save
      redirect_to product_path(@product)
    else
      render :new
    end
  end

  def get_product_attributes
    skip_authorization

    respond_to do |format|
      format.json { render json: ProductAttribute.where(product_id: params[:product_id]) }
    end
  end

  private

  def product_attribute_params
    params.require(:product_attribute).permit(:product_id, :product_type_attribute_id, :value)
  end
end
