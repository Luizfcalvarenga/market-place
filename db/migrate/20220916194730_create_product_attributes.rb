class CreateProductAttributes < ActiveRecord::Migration[6.1]
  def change
    create_table :product_attributes do |t|
      t.references :product, null: false, foreign_key: true
      t.references :product_type_attribute, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
