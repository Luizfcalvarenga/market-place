
class AdvertisementssController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :check_availability_of_order_items_periods, only: [:invoice]

  def index
    @advertisements = policy_scope(Advertisements).where(user_id: current_user).where(status: 'paid').order(created_at: :desc)
  end

  def show
    @advertisement = Advertisement.find(params[:id])
    authorize @advertisement
    @item = @advertisament.advertisable
  end

  def invoice
    @advertisement = Advertisement.find(params[:id])
    authorize @advertisement
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
