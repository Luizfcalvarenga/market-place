class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    # @users = User.all_except(current_user)
    authorize @user
    @chat = Chat.new
    # @chats = Chat.public_chats
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)
    # @single_chats = []
    # Chat.where(name: @chat_name).each do |chat|
    #   @single_chats << chat.name
    # end
    @single_chats
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
