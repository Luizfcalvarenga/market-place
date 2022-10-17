class AddRemovedAtToOrderItems < ActiveRecord::Migration[6.1]
  def change
    add_column :order_items, :removed_at, :datetime
  end
end
