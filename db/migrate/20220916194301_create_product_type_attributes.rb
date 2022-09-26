class CreateProductTypeAttributes < ActiveRecord::Migration[6.1]
  def change
    create_table :product_type_attributes do |t|
      t.references :product_type, null: false, foreign_key: true
      t.string :name
      t.string :kind
      t.string :options, array: true, default: []
      t.string :prompt


      t.timestamps
    end
  end
end
