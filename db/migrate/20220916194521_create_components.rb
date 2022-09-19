class CreateComponents < ActiveRecord::Migration[6.1]
  def change
    create_table :components do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, foreign_key: true
      t.references :component_type, null: false, foreign_key: true
      t.string :modality
      t.string :name
      t.text :description
      t.integer :price_in_cents

      t.timestamps
    end
  end
end
