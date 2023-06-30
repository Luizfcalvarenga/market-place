class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user
  before_create :confirm_participant
  has_many_attached :attachments, dependent: :destroy

  # validates :content,  presence: true
  after_create_commit do
    notify_recipients
    update_parent_chat
    broadcast_append_to chat
  end

  before_create :confirm_participant

  def chat_attachment(index)
    target = attachments[index]
    return unless attachments.attached?

    if target.image?
      target
    elsif target.video?
      target
    end
  end

  def confirm_participant
    return unless chat.is_private
    is_participant = Participant.where(user_id: self.user.id, chat_id: self.chat.id ).first
    throw :abort unless is_participant
  end

  def update_parent_chat
    chat.update(last_message_at: Time.now)
  end

  def broadcast_to_user
    broadcast_update_to 'user_notifications', partial: 'users/notifications', user: self.recipient, chat: self.params[:chat]
  end

  private

  def notify_recipients
    conversations = Chat.where(is_private: true).where("name ILIKE ?", "%_#{Current.user.id}%").map { | private_chat | private_chat.participants.where.not(user_id: Current.user.id).first}
    conversations = conversations.compact()
    users_in_chat = conversations.map { | conversation | User.find_by(["id = ?", conversation.user_id])}

    users_in_chat.each do |user|
      next if user.eql?(self.user)
      notification = MessageNotification.with(message: self, chat: self.chat)
      notification.deliver_later(user)
    end
  end
end
