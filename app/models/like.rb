class Like < ApplicationRecord
  belongs_to :user
  belongs_to :likeble, polymorphic: true
end
