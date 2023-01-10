class CouponValidator
  attr_reader :result, :error, :coupon

  def initialize(coupon_code)
    @coupon_code = coupon_code
  end

  def call()
    @coupon = Coupon.find_by(code: @coupon_code)

    return { result: false, error: 'Inválido' } unless @coupon

    return { result: false, error: 'Expirado' } if @coupon.expired?

    return { result: false, error: 'Limite Excedido' } if @coupon.redemption_limit_exceeded?

    { result: true, response: 'Ok', discount: @coupon.discount_display }
  end
end
