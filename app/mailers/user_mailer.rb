class UserMailer < ApplicationMailer
  include Devise::Controllers::UrlHelpers
  default from: 'Market Nuflow <mail@nuflow.com.br>'

  def password_reset(user, token)
    @user = user
    @token = token
    mail(to: @user.email, subject: 'Recuperação de senha do NuflowPass')
  end
end
