class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    # kk
    # @me = current_user
    @private_chats = []
    @users = []
    @conversations = []
    @sera = []
    Chat.where(is_private: true).where("name ILIKE ?", "%_3%").each do | private_chat |

      @conversations << private_chat.participants.where.not(user_id: current_user.id).first

    end

   
    authorize @user
    @chat = Chat.new
    @chats = Chat.public_chats
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)

    @message = Message.new
    @messages = @single_chat.messages.order(created_at: :asc)
    render 'chats/index'
  end

  private

  def get_name(user1, user2)
    user = [user1, user2].sort
    "private_#{user[0].id}_#{user[1].id}"
  end
end
