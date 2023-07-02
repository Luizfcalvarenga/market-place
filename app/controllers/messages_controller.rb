class MessagesController < ApplicationController

  def create
    if msg_params[:content].blank? && msg_params[:attachments].blank?
      flash[:alert] = "Mensagem não pode ser vazia"
      skip_authorization
      return
    end

    if msg_params[:content].blank?
      @message = current_user.messages.create(
        attachments: msg_params[:attachments],
        chat_id: params[:chat_id]
      )
    else
      @message = current_user.messages.create(
        content: msg_params[:content],
        attachments: msg_params[:attachments],
        chat_id: params[:chat_id]
      )
    end
    skip_authorization
    MessageMailer.with(message: @message).new_message.deliver_now
  end

  private

  def msg_params
    params.require(:message).permit(:content, attachments: [])
  end
end
