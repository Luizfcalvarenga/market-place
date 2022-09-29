class CategoriesController < ApplicationController
  skip_after_action :verify_authorized, except: :index
  skip_after_action :verify_policy_scoped, only: :index

  skip_before_action :authenticate_user!


  # def get_categories
  #   @categories = Category.all

  #   skip_authorization

  #   respond_to do |format|
  #     format.json { render json: @categories }
  #   end
  # end
end
