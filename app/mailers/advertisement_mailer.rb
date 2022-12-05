class AdvertisementMailer < ApplicationMailer
  default from: "nuflow@shop.com"
  def advertisement_creation
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "Anúncio criado com sucesso!!!")
  end
end
