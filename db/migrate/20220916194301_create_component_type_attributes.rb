class CreateComponentTypeAttributes < ActiveRecord::Migration[6.1]
  def change
    create_table :component_type_attributes do |t|
      t.references :component_type, null: false, foreign_key: true
      t.string :name
      t.string :kind
      t.string :options

      t.timestamps
    end
  end
end
