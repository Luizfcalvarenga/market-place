class ChatsController < ApplicationController
  include ChatsHelper
  before_action :authenticate_user!
  before_action :set_status

  def index
    @chat = Chat.new
    @chats = policy_scope(Chat)
    @conversations = Chat.where(is_private: true).where("name ILIKE ?", "%_#{current_user.id}%").map { | private_chat | private_chat.participants.where.not(user_id: current_user.id).first}
    @users = @conversations.map { | conversation | User.find_by(["id = ?", conversation.user_id])}
    current_user.update(current_chat: nil)
    render 'index'
  end

  def show
    @single_chat = Chat.find(params[:id])
    current_user.update(current_chat: @single_chat)
    @chat = Chat.new
    @chats = Chat.public_chats
    authorize @chats
    @message = Message.new
    @messages = @single_chat.messages.order(created_at: :asc)
    @users = User.all_except(current_user)
    render 'index'
  end

  def create
    @chat = Chat.create(name: params['chat']['name'])
    authorize @chat
  end

  private

  def set_status
    current_user.update!(status: User.statuses[:online]) if current_user
  end

end
