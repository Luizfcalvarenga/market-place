class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.references :bike, foreign_key: true
      t.references :seller, null: false, foreign_key: { to_table: :users }
      t.references :buyer, null: false, foreign_key: { to_table: :users }
      t.references :product, foreign_key: true

      t.timestamps
    end
  end
end
