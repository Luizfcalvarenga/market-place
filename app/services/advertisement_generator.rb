class AdvertisementGenerator
  attr_reader :advertisable

  def initialize(advertisable)
    @advertisable = advertisable
  end

  def call
    # return if @advertisable.advertisement.exits?

    ActiveRecord::Base.transaction do
      @advertisement = Advertisement.create(
        user: @advertisable.user,
        advertisable: @advertisable,
        price_in_cents: @advertisable.price_in_cents / 10,
        status: "pending"
      )
      @advertisement.persisted?
    end
  end

  # def advertisement_price

  #   price_in_cents = nil
  #   product_price = Product.find(id: @advertisable.id).price_in_cents

  #   case product_price
  #   when 0..50000
  #     price_in_cents = 0
  #   when 50100..250000
  #     price_in_cents = 5000
  #   when 250100..500000
  #     price_in_cents = 10000
  #   when 500100..1000000
  #     price_in_cents = 15000
  #   else
  #     price_in_cents = 20000
  #   end
  #   price_in_cents
  # end

  private

  def advertisement_params
    params.require(:advertisement).permit(:advertisable, :user, :price_in_cents, :status)
  end
end
