module Admin
  class AdvertisementsController < ApplicationController
    def index
      @reference_date = params[:date].present? && params[:date][:year].present? && params[:date][:month].present? ? Time.new(params[:date][:year].to_i, params[:date][:month].to_i, 1) : Time.current
      min_date = @reference_date.at_beginning_of_month
      max_date = @reference_date.at_end_of_month.change(hour: 23, min: 59, sec: 59)

      @advertisements = Advertisement.where("created_at > ? and created_at < ?", min_date, max_date).order(:invoice_paid_at).uniq
      @products = @advertisements.map { |advertisement| advertisement.advertisable}

      @net_total_sales = @advertisements.map(&:price_in_cents).compact.sum
    end

    def show
      @advertisement = Advertisement.find(params[:id])
      @product = @advertisement.advertisable
      @product_type = @advertisement.advertisable_type
      @user = @advertisement.user
    end

    def approve
      @advertisement = Advertisement.find(params[:advertisement_id])
      @advertisements = Advertisement.all

      service = AdvertisementApprover.new(@advertisement, current_user)


      if service.call
        flash[:notice] = "Pedido aprovado"
        next_waiting_review_advertisement = @advertisements.waiting_review.order(created_at: :asc).first
        redirect_to admin_advertisement_path(id: next_waiting_review_advertisement.id) and return if next_waiting_review_advertisement.present?
        redirect_to admin_advertisements_path and return
      else
        flash[:alert] = service.errors.to_s
        redirect_to admin_dvertisement_path(id: @dvertisement.id)
      end
    end

    def reject
      @advertisement = Advertisement.find(params[:advertisement_id])
      @advertisements = Advertisement.all

      service = AdvertisementRejecter.new(@advertisement, current_user)

      if service.call
        flash[:notice] = "Anuncio rejeitado"
        next_waiting_review_advertisement =  @advertisements.waiting_review.order(created_at: :asc).first
        redirect_to admin_advertsement_path(id: next_waiting_review_advertsement.id) and return if next_waiting_review_advertsement.present?
        redirect_to admin_advertsements_path and return
      else
        flash[:alert] = service.errors.to_s
        redirect_to admin_advertisement_path(id: @advertisement.id)
      end
    end
  end
end
