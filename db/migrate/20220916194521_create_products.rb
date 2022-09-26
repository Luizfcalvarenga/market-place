class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, foreign_key: true
      t.references :product_type, null: false, foreign_key: true
      t.string :modality
      t.string :name
      t.text :description
      t.integer :price_in_cents
      t.integer :quantity


      t.timestamps
    end
  end
end
