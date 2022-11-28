class AdvertisementGenerator
  attr_reader :advertisable

  def initialize(advertisable)
    @advertisable = advertisable
  end

  def call
    ActiveRecord::Base.transaction do
      return if Advertisement.exists?(advertisable: advertisable)
      @advertisement = Advertisement.create({user: @advertisable.user,
                                    advertisable_id: @advertisable_id,
                                    price_in_cents: advertisement_price,
                                    status: "pending"

                                  })
    end
  end

  def advertisement_price
    first_announce = 50000
    second_announce = 250000
    third_announce = 500000
    fourth_announce = 1000000

    if first_announce < Product.find(id: @advertisable.id).price_in_cents < second_announce
      return 5000
    elsif second_announce < Product.find(id: @advertisable.id).price_in_cents < third_announce
      return 10000
    elsif third_announce < Product.find(id: @advertisable.id).price_in_cents < fourth_announce
      return 15000
    elsif Product.find(id: @advertisable.id).price_in_cents > fourth_announce
      return 20000
    end
  end
end
