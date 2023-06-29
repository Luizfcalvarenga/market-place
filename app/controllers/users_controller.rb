class UsersController < ApplicationController
  include ActionView::Helpers::NumberHelper
  include ChatsHelper
  def show
    if current_user.blank?
      redirect_to new_user_session_path
      flash[:alert] = "você deve fazer login ou criar uma conta para iniciar um chat."
    end
    @user = User.find(params[:id])
    @chat = Chat.new
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)
    current_user.update(current_chat: @single_chat)
    @product = Product.find(params[:product_id]) if params[:product_id].present?
    @product = Bike.find(params[:bike_id]) if params[:bike_id].present?
    @chats = policy_scope(Chat)
    chat_ids =Participant.where(user_id:  current_user.id).pluck(:chat_id)
    user_ids = @chats.where(id: chat_ids).map {|chat| chat.participants.where.not(user_id:  current_user.id)}.flatten.pluck(:user_id)
    user_ids.uniq!
    @users = User.where(id: user_ids)
    authorize @user
    @message = Message.new
    @messages = @single_chat.messages.order(created_at: :asc)
    set_notifications_to_read
    if (( params[:product_id].present? || params[:bike_id].present?) && (!@messages.where('content  @@ ?', "Olá, gostaria de conversar sobre - #{@product.city.name}").where(user: current_user).present?))
      if @product.instance_of? Bike
        @message_beggining = Message.create(chat: @single_chat, user: current_user, content: "Olá, gostaria de conversar sobre a bike: #{@product.frame_brand} #{@product.model} - #{display_price(@product.price_in_cents)} - #{@product.city.name} - #{@product.state.acronym}")
      elsif @product.instance_of? Product
        @message_beggining = Message.create(chat: @single_chat, user: current_user, content: "Olá, gostaria de conversar sobre o produto: #{@product.product_type.prompt} - #{@product.name} - #{@product.brand} #{@product.model} - #{display_price(@product.price_in_cents)} - #{@product.city.name} - #{@product.state.acronym}")
      end
    end
    render 'chats/index'
  end

  private

  def set_notifications_to_read
    notifications = @single_chat.notifications_as_chat.where(recipient: current_user).unread
    notifications.update_all(read_at: Time.zone.now)
  end
end
