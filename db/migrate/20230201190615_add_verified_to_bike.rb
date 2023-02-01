class AddVerifiedToBike < ActiveRecord::Migration[6.1]
  def change
    add_column :bikes, :verified, :boolean, default: false
  end
end
