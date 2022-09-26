class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.references :bike, foreign_key: true
      t.references :product, foreign_key: true
      t.references :service, foreign_key: true
      t.references :order, foreign_key: true
      t.integer :quantity
      t.integer :price_in_cents

      t.timestamps
    end
  end
end
