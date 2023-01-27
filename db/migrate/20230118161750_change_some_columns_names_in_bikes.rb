class ChangeSomeColumnsNamesInBikes < ActiveRecord::Migration[6.1]
  def change
    rename_column :bikes, :structural_visual_condition, :bike_condition_status
    rename_column :bikes, :operating_condition, :bike_condition_description
  end
end
