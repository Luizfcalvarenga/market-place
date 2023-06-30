class MessagesController < ApplicationController

  def create
    # if  msg_params[:content].blank?
    #   flash[:alert] = "Mensagem não pode ser vazia"
    #   skip_authorization

    #   return
    # end
    # @message = current_user.messages.create(
    #   content: msg_params[:content],
    #   chat_id: params[:chat_id],
    #   attachments: msg_params[:attachments]
    # )

    if msg_params[:content].blank? && msg_params[:attachments].blank?
      flash[:alert] = "Mensagem não pode ser vazia"
      skip_authorization
      return
    end

    if msg_params[:content].blank?
      # Content is blank, so attachment must be present
      @message = current_user.messages.create(
        attachments: msg_params[:attachments],
        chat_id: params[:chat_id]
      )
    else
      # Content is present, so attachment can be blank or present
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
