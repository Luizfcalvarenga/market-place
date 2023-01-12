
class AdvertisementsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @advertisements = policy_scope(Advertisement).order(created_at: :desc)
  end

  def show
    @advertisement = Advertisement.find(params[:id])
    authorize @advertisement
    if @advertisement.advertisable_type == "Product"
      @item = Product.find_by(id: @advertisement.advertisable.id)
    elsif @advertisement.advertisable_type == "Bike"
      @item = Bike.find_by(id: @advertisement.advertisable.id)
    end

    
  end

  def invoice
    @advertisement = Advertisement.find(params[:id])
    authorize @advertisement

    if @advertisement.is_free?
      @advertisement.perform_after_payment_confirmation_actions
      flash[:notice] = "Anúncio criado com sucesso"
      redirect_to my_products_path and return
    end

    if @advertisement.should_generate_new_invoice?
      ::NovaIugu::InvoiceGenerator.new(@advertisement).call
    else
      begin
        ::NovaIugu::ChargeCheckAndUpdateStatus.new(@advertisement).call
      rescue Iugu::ObjectNotFound
        begin
          ::NovaIugu::InvoiceGenerator.new(@advertisement).call
        rescue
          @advertisement_error = true
        end
      end
    end
  end

  def status
    @advertisement = Advertisement.find(params[:id])
    authorize @advertisement
    ::NovaIugu::ChargeCheckAndUpdateStatus.new(@advertisement).call
    render json: { status: @advertisement.status }
  end
end
