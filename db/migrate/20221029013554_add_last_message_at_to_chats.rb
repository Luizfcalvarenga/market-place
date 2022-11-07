class AddLastMessageAtToChats < ActiveRecord::Migration[6.1]
  def change
    add_column :chats, :last_message_at, :datetime
  end
end
