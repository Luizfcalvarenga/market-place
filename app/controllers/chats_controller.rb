class ChatsController < ApplicationController
  before_action :authenticate_user!

  def index
    @chat = Chat.new
    @chats = policy_scope(Chat)

    @users = User.all_except(current_user)
    render 'index'
  end

  def show
    @single_chat = Chat.find(params[:id])

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

end
