class ChangeAccessoriesInBikesFromBooleanToString < ActiveRecord::Migration[6.1]
  def change
    change_column :bikes, :accessories, :string
  end
end
