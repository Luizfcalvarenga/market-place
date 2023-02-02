class AddVerifiedToProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :verified, :boolean, default: false
  end
end
