class ChangeOthersColumnsNamesInBikes < ActiveRecord::Migration[6.1]
  def change
    rename_column :bikes, :bike_conditions, :bike_condition
    rename_column :bikes, :front_rim_size, :front_rim_model
    rename_column :bikes, :rear_rim_size, :rear_rim_model
  end
end
