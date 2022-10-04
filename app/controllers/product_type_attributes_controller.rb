class ProductTypeAttributesController < ApplicationController
  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!


  def get_attributes_for_product
    skip_authorization

    respond_to do |format|
      format.json { render json: ProductTypeAttribute.return_questions_for_new_product_type(params[:product_type].to_i) }
    end
  end
end
