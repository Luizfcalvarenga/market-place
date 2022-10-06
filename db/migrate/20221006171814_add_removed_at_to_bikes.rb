class AddRemovedAtToBikes < ActiveRecord::Migration[6.1]
  def change
    add_column :bikes, :removed_at, :datetime
  end
end
