class Component < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :component_type
end
