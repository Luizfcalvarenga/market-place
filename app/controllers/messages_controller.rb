class MessagesController < ApplicationController
  def create
    @message = current_user.messages.create(content: msg_params[:content], chat_id: params[:chat_id])
    skip_authorization
  end

  private

  def msg_params
    params.require(:message).permit(:content)
  end
end
