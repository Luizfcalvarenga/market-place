class City < ApplicationRecord
  belongs_to :state

  has_many :products
  has_many :bikes
  def self.cities_for_state(state_id)
    City.where(state_id: state_id)
  end
end
