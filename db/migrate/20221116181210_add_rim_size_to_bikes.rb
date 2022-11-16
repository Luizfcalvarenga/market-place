class AddRimSizeToBikes < ActiveRecord::Migration[6.1]
  def change
    add_column :bikes, :rim_size, :string
  end
end
