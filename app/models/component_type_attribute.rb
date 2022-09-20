class ComponentTypeAttribute < ApplicationRecord
  belongs_to :component_type

  has_many :component_attributes

  
end
