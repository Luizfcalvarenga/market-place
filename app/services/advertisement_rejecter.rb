class AdvertisementRejecter
  attr_reader :advertisement, :attrs_rejected, :values_to_review, :comments, :errors

  def initialize(advertisement, rejected_by, attrs_rejected, values_to_review, comments)
    @advertisement = advertisement
    @rejected_by = rejected_by
    @attrs_rejected = attrs_rejected
    @values_to_review = values_to_review
    @comments = comments
    @errors = []
  end

  def call
    ActiveRecord::Base.transaction do
      advertisement.update(
        status: "update_requested"
      )
      AdvertisementMailer.with(advertisement: @advertisement, attrs_rejected: @attrs_rejected, values_to_review: @values_to_review, comments: @comments).advertisement_rejecter.deliver_now
    end

    true
  rescue StandardError  => e
    errors << { generic: e }
    false
  end

end
