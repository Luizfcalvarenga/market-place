class UsersController < ApplicationController
  include ChatsHelper
  def show
    @user = User.find(params[:id])
    @chat = Chat.new
    @chats = Chat.public_chats
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)
    current_user.update(current_chat: @single_chat)
    @product = Product.find(params[:product_id]) if params[:product_id].present?
    @product = Bike.find(params[:bike_id]) if params[:bike_id].present?
    # @conversations = Chat.where(is_private: true).where("name ILIKE ?", "%_#{current_user.id}%").map { | private_chat | private_chat.participants.where.not(user_id: current_user.id).first}
    if Chat.where(is_private: true).present?
      @conversations = Chat.where(is_private: true).where("name ILIKE ?", "%_#{current_user.id}%").map { | private_chat | private_chat.participants.where.not(user_id: current_user.id).first}
      @conversations.compact()
    else
      @users = []
      @conversations = []
    end
    if params[:query].present?
      sql_query = "email ILIKE :query OR full_name ILIKE :query"
      @users = User.where(sql_query, query: "%#{params[:query]}%").where.not(user: current_user)
    else
      @conversations = @conversations.compact()
      @users = @conversations.map { | conversation | User.find_by(["id = ?", conversation.user_id])}
    end
    authorize @user
    @message = Message.new
    @messages = @single_chat.messages.order(created_at: :asc)
    set_notifications_to_read
    if (( params[:product_id].present? || params[:bike_id].present?) && !@messages.where('content  @@ ?', "Olá, gostaria de conversar sobre o produto: ##{@product.id}"))
      @message_beggining = Message.create(chat: @single_chat, user: current_user, content: "Olá, gostaria de conversar sobre o produto: ##{@product.id} - #{@product.brand || @product.frame_brand} #{@product.model} - #{number_to_currency(product.price_in_cents / 100, unit: "R$", separator: ",", delimiter: ".", precision: 2)} - #{@product.city.name} - #{@product.state.acronym} -")
      # if @product.photos.attached? && params[:photo].present?
      #   @message_beggining.attachments.attach(params[:photo])
      # end
    end
    # raise
    render 'chats/index'
  end

  private

  def set_notifications_to_read
    notifications = @single_chat.notifications_as_chat.where(recipient: current_user).unread
    notifications.update_all(read_at: Time.zone.now)
  end
end
