class ComponentAttribute < ApplicationRecord
  belongs_to :component
  belongs_to :component_type_attribute
end
