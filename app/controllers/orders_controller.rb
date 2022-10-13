class OrdersController < ApplicationController
  skip_before_action :authenticate_user!


  def index
    @orders = policy_scope(Order).where(user_id: current_user).order(created_at: :desc)

  end

  def show
    @order = current_order
    authorize @order
    @order_items = @order.order_items
  end

  def invoice
    @order = Order.find(params[:id])
    authorize @order
    if @order.should_generate_new_invoice?
      ::NovaIugu::InvoiceGenerator.new(@order).call
    else
      begin
        ::NovaIugu::ChargeCheckAndUpdateStatus.new(@order).call
      rescue Iugu::ObjectNotFound
        begin
          ::NovaIugu::InvoiceGenerator.new(@order).call
        rescue
          @order_error = true
        end
      end
    end
  end

  def status
    @order = Order.find(params[:id])
    authorize @order
    ::NovaIugu::ChargeCheckAndUpdateStatus.new(@order).call
    render json: { status: @order.status }
  end
end
