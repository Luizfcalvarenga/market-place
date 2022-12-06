class AdvertisementRejecter
  attr_reader :advertisement, :errors

  def initialize(advertisement, rejected_by)
    @advertisement = advertisement
    @rejected_by = rejected_by
    @errors = []
  end

  def call
    ActiveRecord::Base.transaction do
      advertisement.update(
        status: "rejected"
      )
      AdvertisementMailer.with(advertisement: @advertisement).advertisement_rejecter.deliver_now
    end

    true
  rescue StandardError  => e
    errors << { generic: e }
    false
  end

end
