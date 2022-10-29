class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  has_many_attached :attachments, dependent: :destroy


  after_create_commit do
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

end
