class AdvertisementApprover
  attr_reader :advertisement, :errors

  def initialize(advertisement, approved_by)
    @advertisement = advertisement
    @approved_by = approved_by
    @errors = []
  end

  def call
    # validator_service = OrderValidator.new(advertisement, Order::ALL_REQUIRED_FIELDS)
    # raise validator_service.errors.to_s if !validator_service.valid?

    # raise "O design precisa ter um ID da Cardcom para ser aprovado para entrega física" if (order.both? || order.physical?) && order.design.cardcom_modelo_id.blank?

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
