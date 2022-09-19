class Category < ApplicationRecord
  has_many :bikes
  has_many :components
end
