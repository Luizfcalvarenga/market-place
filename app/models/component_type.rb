class ComponentType < ApplicationRecord
  has_many :component_type_attributes
  has_many :components
end
