module Admin
  class AdvertisementsController < ApplicationController
    def index
      @reference_date = params[:date].present? && params[:date][:year].present? && params[:date][:month].present? ? Time.new(params[:date][:year].to_i, params[:date][:month].to_i, 1) : Time.current
      min_date = @reference_date.at_beginning_of_month
      max_date = @reference_date.at_end_of_month.change(hour: 23, min: 59, sec: 59)
      if params[:status].present?
        @advertisements = Advertisement.where("created_at > ? and created_at < ?", min_date, max_date).where(status: params[:status]).order(created_at: :desc)
      else
        @advertisements = Advertisement.where("created_at > ? and created_at < ?", min_date, max_date).order(created_at: :desc)
      end
      @products = @advertisements.map { |advertisement| advertisement.advertisable}
      @net_total_sales = @advertisements.map do |advertisement|
        coupon_price = advertisement.final_price_with_coupon_in_cents
        coupon_price.present? ? coupon_price : advertisement.price_in_cents
      end.compact.sum
    end

    def show
      @advertisement = Advertisement.find(params[:id])
      @advertisable = @advertisement.advertisable
      @advertisable_type = @advertisement.advertisable_type
      @user = @advertisement.user
      @parms_to_edit  = nil
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
      @attrs_rejected =[]
      @values_to_review =[]
      params.each do |key, value|
        if key.include? "revisar"
          @attrs_rejected << key
          @values_to_review << value
        end
      end

      if params[:comments].present?
        @comments = params[:comments]
      end
      @attrs_rejected
      @values_to_review
      @comments
      service = AdvertisementRejecter.new(@advertisement, current_user, @attrs_rejected, @values_to_review, @comments)
      if service.call
        flash[:notice] = "Anuncio rejeitado"
        next_waiting_review_advertisement =  @advertisements.waiting_review.order(created_at: :asc).first
        redirect_to admin_advertisement_path(id: next_waiting_review_advertisement.id) and return if next_waiting_review_advertisement.present?
        redirect_to admin_advertisements_path and return
      else
        flash[:alert] = service.errors.to_s
        redirect_to admin_advertisement_path(id: @advertisement.id)
      end
    end

    def ajust_product_info
      @advertisement = Advertisement.find(params[:advertisement_id])
      @product = @advertisement.advertisable
      @attr_to_update = nil
      @new_value = nil
      params.each do |key, value|
        if value.present? && (key != "advertisement_id" && key != "_method" && key != "action" && key != "controller")
          @attr_to_update = key.to_sym
          @new_value = value
        end
      end
    end
  end
end
