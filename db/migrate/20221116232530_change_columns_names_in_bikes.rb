class ChangeColumnsNamesInBikes < ActiveRecord::Migration[6.1]
  def change
    rename_column :bikes, :battery_cyles, :battery_cycles
  end
end
