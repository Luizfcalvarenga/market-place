class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

	include DeviseTokenAuth::Concerns::User

  has_many :buyer_chats, :foreign_key => "buyer_id", :class_name => "chat"
  has_many :seller_chats, :foreign_key => "seller_id", :class_name => "chat"

	def admin?
		true
	end
end
