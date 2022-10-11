class OrdersController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_availability_of_order_items_periods, only: [:invoice]

  def index
    @orders = policy_scope(Order).where(user_id: current_user).where(status: 'paid').order(created_at: :desc)
  end

  def show
    @order = current_order
    authorize @order
    @order_items = @order.order_items
  end
end
