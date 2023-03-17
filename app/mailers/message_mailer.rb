class MessageMailer < ApplicationMailer
  default from: "NuflowPass <naoresponda@nuflowpass.com.br>"
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.message_mailer.new_message.subject
  #
  def new_message
    @message = params[:message]
    @owner = User.find(@message.chat.participants.where.not(user: @message.user).first.user_id)
    @client = User.find(@message.user_id)
    mail(to: @owner.email, subject: "Nova mensagem de chat!!!")
  end
end
