class RemoveColumnsFromBike < ActiveRecord::Migration[6.1]
  def change
    remove_column :bikes, :size
    remove_column :bikes, :age
    remove_column :bikes, :category

  end
end
