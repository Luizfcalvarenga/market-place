module Admin
  class CouponsController < ApplicationController
    def index
      @coupons = policy_scope(Coupon).order(created_at: :desc)
    end

    def new
      @coupon = Coupon.new
      authorize @coupon
    end

    def create
      @coupon = Coupon.new(coupon_params)
      authorize @coupon

      if @coupon.save
        flash[:notice] = "Coupon criado com sucesso"
        redirect_to admin_coupons_path and return
      else
        flash[:alert] = "Erro ao criar coupon"
        render :edit
      end
    end

    def edit
      @coupon = Coupon.find(params[:id])
      authorize @coupon
    end

    def update
      @coupon = Coupon.find(params[:id])
      authorize @coupon

      if @coupon.update(coupon_params)
        flash[:notice] = "Coupon editado com sucesso"
        redirect_to admin_coupons_path and return
      else
        flash[:alert] = "Erro ao criar coupon"
        render :edit
      end
    end

    private

    def coupon_params
      params.require(:coupon).permit(
        :redemption_limit,
        :valid_until,
        :code,
        :kind,
        :discount)
    end
  end
end
