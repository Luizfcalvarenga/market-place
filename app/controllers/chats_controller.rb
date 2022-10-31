class ChatsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_status

  def index
    @chat = Chat.new
    @chats = policy_scope(Chat)


    @users = User.all_except(current_user)
    render 'index'
    @user = current_user
    current_user.update(current_chat: nil)
    # @single_chats = Participant.where(user_id: @user).each do | participant |
    #   @chats.where(id: participant.chat_id).where(is_private: true)
    # end

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
