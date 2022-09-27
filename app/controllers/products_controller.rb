class ProductsController < ApplicationController
  skip_after_action :verify_authorized, except: [:index, :show]
  skip_after_action :verify_policy_scoped, only: [:index, :show]

  skip_before_action :authenticate_user!

  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
    skip_authorization
  end
end
