class AddColumnsToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :locality, :string
    add_column :products, :year, :string

  end
end
