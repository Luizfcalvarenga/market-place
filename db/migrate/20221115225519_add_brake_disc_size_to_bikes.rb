class AddBrakeDiscSizeToBikes < ActiveRecord::Migration[6.1]
  def change
    add_column :bikes, :brake_disc_size, :string
  end
end
