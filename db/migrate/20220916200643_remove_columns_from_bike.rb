class RemoveColumnsFromBike < ActiveRecord::Migration[6.1]
  def change
    remove_column :bikes, :category, :string
    remove_column :bikes, :age, :integer
    remove_column :bikes, :size, :string
  end
end
