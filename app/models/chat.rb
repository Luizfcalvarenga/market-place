class Chat < ApplicationRecord
  # validates_uniqueness_of :name
  belongs_to :bike
  # belongs_to :buyer_id, class_name: "user"
  # belongs_to :seller_id, class_name: "user"
  belongs_to :product

  has_many :messages, dependent: :destroy
  has_many :participants, dependent: :destroy

  scope :public_chats, -> { where(is_private: false) }
  after_create_commit { broadcast_if_public }

  def broadcast_if_public
    broadcast_append_to 'chats' unless is_private
  end

  def self.create_private_chat(users, chat_name)
    single_chat = Chat.create(name: chat_name, is_private: true)
    users.each do |user|
      Participant.create(user: user, chat_id: single_chat.id)
    end
    single_chat
  end

  # def participant?(chat, user)
  #   chat.participants.where(user: user).exists?
  #   Participant.where(user_id: user.id, chat_id: chat.id).exists?
  # end
end
