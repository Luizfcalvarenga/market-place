class CreateAdvertisements < ActiveRecord::Migration[6.1]
  def change
    create_table :advertisements do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.references :advertisable, polymorphic: true, null: false
      t.string :invoice_id
      t.string :invoice_url
      t.string :invoice_pdf
      t.integer :net_value
      t.integer :price_in_cents
      t.integer :value
      t.datetime :invoice_paid_at
      t.string :status

      t.timestamps
    end
  end
end
