class CreateComponentAttributes < ActiveRecord::Migration[6.1]
  def change
    create_table :component_attributes do |t|
      t.references :component, null: false, foreign_key: true
      t.references :component_type_attribute, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
