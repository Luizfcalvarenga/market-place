class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :invoice_id
      t.string :invoice_url
      t.string :invoice_pdf
      t.integer :net_value
      t.integer :value
      t.integer :price_in_cents
      t.datetime :invoice_paid_at
      t.string :status
      t.string :tracker_code
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
