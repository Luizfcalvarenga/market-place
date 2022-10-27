class RemoveBuyerIdAndSelleIdFromChat < ActiveRecord::Migration[6.1]
  def change
    remove_column :chats, :buyer_id
    remove_column :chats, :seller_id

  end
end
