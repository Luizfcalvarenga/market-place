class AddAccessToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :access, :string, default: "user"
  end
end
