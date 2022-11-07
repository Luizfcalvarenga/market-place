class UsersController < ApplicationController
  include ChatsHelper
  def show
    @user = User.find(params[:id])
    # @users = User.all_except(current_user)
    @conversations = Chat.where(is_private: true).where("name ILIKE ?", "%_#{current_user.id}%").map { | private_chat | private_chat.participants.where.not(user_id: current_user.id).first}
    @users = @conversations.map {| conversation | User.find_by(["id = ?", conversation.user_id])}
    authorize @user
    @chat = Chat.new
    @chats = Chat.public_chats
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)
    current_user.update(current_chat: @single_chat)
    @message = Message.new
    @messages = @single_chat.messages.includes(:user).order(created_at: :asc)
    render 'chats/index'
  end

end
