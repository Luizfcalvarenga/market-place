class AdvertisementApprover
  attr_reader :advertisement, :errors

  def initialize(advertisement, approved_by)
    @advertisement = advertisement
    @approved_by = approved_by
    @errors = []
  end

  def call
    ActiveRecord::Base.transaction do
      advertisement.update(
        status: "approved"
      )
      AdvertisementMailer.with(advertisement: @advertisement).advertisement_approval.deliver_now
    end
    true
  rescue StandardError  => e
    errors << { generic: e }
    false
  end
end
