class AddRemovedAtToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :removed_at, :datetime
  end
end
