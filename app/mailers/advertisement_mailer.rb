class AdvertisementMailer < ApplicationMailer
  default from: "Market Nuflow <mail@nuflow.com.br>"
  def advertisement_creation
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to: @client.email, subject: "Falta pouco para anunciar seu produto!")
  end

  def notify_admin_advertisement_creation
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to: "contato@nuflowshop.com.br", subject: "Novo anúncio para revisão")
  end


  def advertisement_approval
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to: @client.email, subject: "Parabéns! seu anúncio foi publicado.")
  end

  def advertisement_rejecter
    @advertisement = params[:advertisement]
    @attrs_rejected = params[:attrs_rejected]
    @values_to_review = params[:values_to_review]
    @comments = params[:comments]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to: @client.email, subject: "Quase lá! revise seu anúncio para publicá-lo")
  end

  def advertisement_updater
    @advertisement = params[:advertisement]
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to:"contato@nuflowshop.com.br", subject: "Anuncio revisado!!!")
  end

  def advertisement_paid
    @advertisement = params[:advertisement]
    @client = @advertisement.user
    @advertisable = @advertisement.advertisable
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to: @client.email, subject: "Seu anúncio foi recebido e será publicado em breve.")
  end
end
