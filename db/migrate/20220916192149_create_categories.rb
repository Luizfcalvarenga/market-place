class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :modalities, array: true, default: []

      t.timestamps
    end
  end
end
