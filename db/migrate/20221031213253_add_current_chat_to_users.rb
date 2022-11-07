class AddCurrentChatToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :current_chat, :integer
  end
end
