# Preview all emails at http://localhost:3000/rails/mailers/message_mailer
class MessageMailerPreview < ActionMailer::Preview

  def new_message
    message = Message.last
    MessageMailer.with(message: message).new_message
  end

end
