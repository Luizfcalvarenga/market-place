class OrderItemsController < ApplicationController

  def new
    @order_item =  OrderItem.new
    authorize @order_item
    @order = current_order
  end

  def create
    @order_item = OrderItem.new(order_item_params)
    authorize @order_item
    # @order = current_order
    @order_item.order = current_order
    @product = Product.find(params[:id])
    @order_item.product = @product

    if @order_item.save
      flash[:notice] = "Produto adicionada ao carrinho."
      redirect_to products_path
    else
      flash[:notice] = "Algo deu errado ao adicionar."
      render product_path(@product)
    end
  end

  def destroy
    @order_item = OrderItem.find(params[:id])
    authorize @order_item
    @order_item.bike = @bike
    @order_item.product = @product
    @order = current_order
    @order_item.touch(:removed_at)
    redirect_to order_path(@order)
  end

  private

  def order_item_params
    params.require(:order_item).permit(:product_id, :quantity, :price_in_cents)
  end
end
