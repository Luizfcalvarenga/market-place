class Chat < ApplicationRecord
  belongs_to :bike
  belongs_to :buyer_id, class_name: "user"
  belongs_to :seller_id, class_name: "user"
  belongs_to :product

  has_many :messages

end
