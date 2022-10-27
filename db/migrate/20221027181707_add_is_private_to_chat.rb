class AddIsPrivateToChat < ActiveRecord::Migration[6.1]
  def change
    add_column :chats, :is_private, :boolean, default: false
  end
end
