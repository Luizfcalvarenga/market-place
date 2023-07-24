class UserMailer < ApplicationMailer
  include Devise::Controllers::UrlHelpers
  default from: 'Market Nuflow <mail@nuflow.com.br>'

  def password_reset(user, token)
    @user = user
    @token = token
    attachments.inline['white_logo.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'white_logo.png'))
    attachments.inline['youtube.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'youtube.png'))
    attachments.inline['instagram.png'] = File.read(Rails.root.join('app', 'assets', 'images', 'instagram.png'))
    mail(to: @user.email, subject: 'Recuperação de senha da Nuflow Market')
  end
end
