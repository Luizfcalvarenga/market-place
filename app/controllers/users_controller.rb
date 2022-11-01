class UsersController < ApplicationController
  include ChatsHelper
  def show
    @user = User.find(params[:id])

    # @users = []
    @users = User.all_except(current_user)
    @conversations = []
    Chat.where(is_private: true).where("name ILIKE ?", "%_3%").each do | private_chat |

      @conversations << private_chat.participants.where.not(user_id: current_user.id).first

    end

    # @conversations.map do | conversation |
    #   @users << User.find_by(["id = ?", conversation.user_id])
    # end

    # @users

    authorize @user
    @chat = Chat.new
    @chats = Chat.public_chats
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)
    current_user.update(current_chat: @single_chat)

    @message = Message.new
    @messages = @single_chat.messages.order(created_at: :asc)
    render 'chats/index'
  end

end
