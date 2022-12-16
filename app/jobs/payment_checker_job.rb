class PaymentCheckerJob < ApplicationJob
  queue_as :default

  def perform
    Advertisement.where("created_at > ?", Time.current - 10.day).where(invoice_status: "pending").each do |advertisement|
      NovaIugu::ChargeCheckAndUpdateStatus.new(advertisement).call
    end
  end
end
