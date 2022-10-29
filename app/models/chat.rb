class Chat < ApplicationRecord
  # validates_uniqueness_of :name
  belongs_to :bike, optional: true
  # belongs_to :buyer_id, class_name: "user"
  # belongs_to :seller_id, class_name: "user"
  belongs_to :product, optional: true

  has_many :messages
  has_many :participants, dependent: :destroy


  scope :public_chats, -> { where(is_private: false) }
  after_create_commit { broadcast_if_public }

  def broadcast_if_public
    broadcast_append_to 'chats' unless self.is_private
  end

  def self.create_private_chat(users, chat_name)
    single_chat = Chat.create(name: chat_name, is_private: true)
    users.each do |user|
      Participant.create(user: user, chat_id: single_chat.id)
    end
    single_chat
  end

  def self.participant?(chat, user)
    chat.participants.where(user: user).exists?
    Participant.where(user_id: user.id, chat_id: chat.id).exists?
  end

  def latest_message
    messages.includes(:user).order(created_at: :desc).first
  end

  def broadcast_latest_message
    last_message = latest_message

    return unless last_message

    chat_target = "chat_#{id} last_message"
    user_target = "chat_#{id} user_last_message"
    sender = Current.user.eql?(last_message.user) ? Current.user : last_message.user

    broadcast_update_to('chats',
                        target: chat_target,
                        partial: 'chats/last_message',
                        locals: {
                          chat: self,
                          user: last_message.user,
                          last_message: last_message
                        })
    broadcast_update_to('chats',
                        target: user_target,
                        partial: 'users/last_message',
                        locals: {
                          chat: self,
                          user: last_message.user,
                          last_message: last_message,
                          sender: sender
                        })
  end
end
