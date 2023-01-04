class AdvertisementMailer < ApplicationMailer
  default from: "NuflowPass <naoresponda@nuflowpass.com.br>"
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
    @attrs_rejected = params[:attrs_rejected]
    @values_to_review = params[:values_to_review]
    @comments = params[:comments]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "Anúncio reprovado, revise as informações!!!")
  end

  def advertisement_updater
    @advertisement = params[:advertisement]
    # @client = User.find(id: @advertisement.user_id)
    mail(to:"nuflow@shop.com", subject: "Anuncio revisado!!!")
  end
end
