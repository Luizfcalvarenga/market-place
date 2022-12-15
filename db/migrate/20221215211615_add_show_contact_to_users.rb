class AddShowContactToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :show_contact, :boolean, default: false
  end
end
