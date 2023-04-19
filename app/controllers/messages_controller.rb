class MessagesController < ApplicationController
  before_action :authenticate_user!
  def index

    @current_user_id = current_user.id

  end
  def create
    @message = current_user.messages.create(
      content: msg_params[:content],
      chat_id: params[:chat_id],
      attachments: msg_params[:attachments]
    )
    skip_authorization
    # authorize @message
    @current_user_id = current_user.id

    MessageMailer.with(message: @message).new_message.deliver_now
  end

  private

  def msg_params
    params.require(:message).permit(:content, attachments: [])
  end
end
