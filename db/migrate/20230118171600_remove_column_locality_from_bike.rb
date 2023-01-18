class RemoveColumnLocalityFromBike < ActiveRecord::Migration[6.1]
  def change
    remove_column :bikes, :locality
  end
end
