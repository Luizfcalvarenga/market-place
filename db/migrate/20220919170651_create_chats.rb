class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.references :bike, foreign_key: true
      t.references :seller_id, null: false, foreign_key: { to_table: :users }
      t.referances :buyer_id, null: false, foreign_key: { to_table: :users }
      t.references :component, foreign_key: true

      t.timestamps
    end
  end
end
