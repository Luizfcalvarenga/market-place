class ProductTypeAttributesController < ApplicationController
  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!


  def get_attributes_for_product
    skip_authorization

    respond_to do |format|
      format.json { render json: ProductType.find(params[:product_type_id]).product_type_attributes }
    end
  end
end
