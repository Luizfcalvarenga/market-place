class Chat < ApplicationRecord
  belongs_to :bike
  belongs_to :user
  belongs_to :component
end
