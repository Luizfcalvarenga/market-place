class AdvertisementMailer < ApplicationMailer
  default from: "Market Nuflow <naoresponda@nuflowpass.com.br>"
  def advertisement_creation
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "FALTA POUCO PARA ANUNCIAR SEU PRODUTO!")
  end

  def notify_admin_advertisement_creation
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: "contato@nuflowshop.com.br", subject: "Novo anúncio para revisão")
  end


  def advertisement_approval
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "PARABÉNS! SEU ANÚNCIO FOI PUBLICADO.")
  end

  def advertisement_rejecter
    @advertisement = params[:advertisement]
    @attrs_rejected = params[:attrs_rejected]
    @values_to_review = params[:values_to_review]
    @comments = params[:comments]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "QUASE LÁ! REVISE SEU ANÚNCIO PARA PUBLICÁ-LO")
  end

  def advertisement_updater
    @advertisement = params[:advertisement]
    mail(to:"contato@nuflowshop.com.br", subject: "Anuncio revisado!!!")
  end

  def advertisement_paid
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    mail(to: @client.email, subject: "SEU ANÚNCIO FOI RECEBIDO E SERÁ PUBLICADO EM BREVE.")
  end
end
