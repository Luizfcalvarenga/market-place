class AdvertisementUpdater
  attr_reader :advertisement, :advertisable

  def initialize(advertisement, advertisable)
    @advertisement = advertisement
    @advertisable = advertisable

  end

  def call
    # return if @advertisable.advertisement.exits?

    ActiveRecord::Base.transaction do
      @advertisement.update(
        advertisable: @advertisable,
        status: "waiting_review"
      )
    end
    AdvertisementMailer.with(advertisement: @advertisement).advertisement_updater.deliver_now
  end
end
