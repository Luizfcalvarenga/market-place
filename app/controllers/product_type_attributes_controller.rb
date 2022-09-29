class ProductTypeAttributesController < ApplicationController
  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!


  # def get_product_type_attributes
  #   @product_type_attributes = ProductTypeAttribute.all
  #   skip_authorization

  #   respond_to do |format|
  #     format.json { render json: @product_type_attributes }
  #   end
  # end
end
