class MessagesController < ApplicationController
  before_action :authenticate_user!
  def create
    @message = current_user.messages.create(
      content: msg_params[:content],
      chat_id: params[:chat_id],
      attachments: msg_params[:attachments]
    )
    skip_authorization
    # authorize @message

    MessageMailer.with(message: @message).new_message.deliver_now

  end

  private

  def msg_params
    params.require(:message).permit(:content, attachments: [])
  end
end
