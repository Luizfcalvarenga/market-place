class AdvertisementMailer < ApplicationMailer
  default from: "nuflow@shop.com"
  def advertisement_creation
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "Anúncio criado com sucesso!!!")
  end

  def advertisement_approval
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "Anúncio aprovado, já está em cirulação!!!")
  end

  def advertisement_rejecter
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "Anúncio reprovado, revise as informações!!!")
  end

end
