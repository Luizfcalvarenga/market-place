class ProductTypesController < ApplicationController
  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!


  # def get_types_of_product
  #   @product_types = ProductType.all
  #   skip_authorization

  #   respond_to do |format|
  #     format.json { render json: @product_types }
  #   end
  # end
end
