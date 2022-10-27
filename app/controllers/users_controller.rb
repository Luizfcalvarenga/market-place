class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    authorize @user

    @chat = Chat.new
    @chats = Chat.all
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name) || Chat.create_private_chat([@user, current_user], @chat_name)
    @messages = @single_chat.messages.order(created_at: :asc)

    render "chats/index"
  end

  private

  def get_name(user1, user2)
    user = [user1, user2].sort
    "private_#{user[0].id}_#{user[1].id}"
  end
end
