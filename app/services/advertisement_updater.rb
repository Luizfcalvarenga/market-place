class AdvertisementUpdater
  attr_reader :advertisement, :product

  def initialize(advertisement, product)
    @advertisement = advertisement
    @product = product

  end

  def call
    # return if @advertisable.advertisement.exits?

    ActiveRecord::Base.transaction do
      @advertisement.update(
        advertisable: @product,
        status: "waiting_review"
      )
      # @advertisement.update?
    end
    AdvertisementMailer.with(advertisement: @advertisement).advertisement_updater.deliver_now
  end
end
