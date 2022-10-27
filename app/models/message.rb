class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  after_create_commit { broadcast_append_to chat }
  before_create :confirm_participant

  def confirm_participant
    return unless chat.is_private

    is_participant = Participant.where(user_id: self.user.id, chat_id: self.chat.id ).first
    throw :abort unless is_participant
  end
end
