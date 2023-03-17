class AdvertisementGenerator
  attr_reader :advertisable, :errors

  def initialize(advertisable, coupon_code = nil)
    @advertisable = advertisable
    @coupon_code = coupon_code
    @errors = []
  end

  def call()
    coupon_response = CouponValidator.new(@coupon_code).call() if @coupon_code.present?
    if coupon_response && coupon_response[:result] == false
      @errors = coupon_response[:error]
      return
    elsif coupon_response && coupon_response[:result] == true
      @coupon = Coupon.find_by(code: @coupon_code)
    end

    ActiveRecord::Base.transaction do
      @advertisement = Advertisement.create(
        user: @advertisable.user,
        advertisable: @advertisable,
        price_in_cents: advertisement_price,
        status: "pending",
        coupon_id: @coupon.present? ? @coupon.id : nil
      )
      @advertisement.persisted?
    end
    if @advertisement.should_generate_new_invoice?
      ::NovaIugu::InvoiceGenerator.new(@advertisement).call
    end
    AdvertisementMailer.with(advertisement: @advertisement).advertisement_creation.deliver_now
    AdvertisementMailer.with(advertisement: @advertisement).notify_admin_advertisement_creation.deliver_now
  end

  def advertisement_price
    price_in_cents = nil
    product_price = @advertisable.price_in_cents

    case product_price
    when 0..100000
      price_in_cents = 0
    when 100001..500000
      price_in_cents = 3900
    when 500001..1000000
      price_in_cents = 5900
    when 1000001..2000000
      price_in_cents = 8900
    when 2000001..3000000
      price_in_cents = 12900
    else
      price_in_cents = 15900
    end
    price_in_cents
  end

  private

  def advertisement_params
    params.require(:advertisement).permit(:advertisable, :user, :price_in_cents, :status, :coupon_id)
  end
end
