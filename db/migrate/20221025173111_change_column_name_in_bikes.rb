class ChangeColumnNameInBikes < ActiveRecord::Migration[6.1]
  def change
    rename_column :bikes, :opareting_condition, :operating_condition
  end
end
