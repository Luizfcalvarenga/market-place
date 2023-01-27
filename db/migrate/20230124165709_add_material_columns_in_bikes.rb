class AddMaterialColumnsInBikes < ActiveRecord::Migration[6.1]
  def change
    add_column :bikes, :crankset_material, :string
    add_column :bikes, :fork_material, :string
    add_column :bikes, :handlebar_material, :string
    add_column :bikes, :wheel_material, :string
    add_column :bikes, :seat_post_material, :string
  end
end
