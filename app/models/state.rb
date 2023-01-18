class State < ApplicationRecord
  has_many :cities
  has_many :bikes, through: :cities
  has_many :products, through: :cities

end
