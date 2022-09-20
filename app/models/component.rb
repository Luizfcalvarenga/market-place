class Component < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :component_type

  validates :price_in_cents, :modality, :quantity, :name, presence: true

end
