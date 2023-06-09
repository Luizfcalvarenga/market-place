class UserMailer < ApplicationMailer
  include Devise::Controllers::UrlHelpers
  default from: 'Market Nuflow <naoresponda@nuflowpass.com.br>'

  def password_reset(user, token)
    @user = user
    @token = token
    mail(to: @user.email, subject: 'Recuperação de senha do NuflowPass')
  end
end
