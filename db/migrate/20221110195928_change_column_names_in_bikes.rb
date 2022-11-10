class ChangeColumnNamesInBikes < ActiveRecord::Migration[6.1]
  def change
    rename_column :bikes, :rim_size, :front_rim_size

  end
end
