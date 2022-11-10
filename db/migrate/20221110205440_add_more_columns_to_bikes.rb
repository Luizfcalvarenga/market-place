class AddMoreColumnsToBikes < ActiveRecord::Migration[6.1]

  def change
    add_column :bikes, :front_suspension_model, :string
    add_column :bikes, :rear_suspension_model, :string
    add_column :bikes, :front_derailleur_model, :string
    add_column :bikes, :rear_derailleur_model, :string
    add_column :bikes, :crankset, :string
    add_column :bikes, :chain, :string
    add_column :bikes, :brake_model, :string
    add_column :bikes, :rear_rim_size, :string
    add_column :bikes, :front_hub, :string
    add_column :bikes, :rear_hub, :string
    add_column :bikes, :front_tyre, :string
    add_column :bikes, :rear_tyre, :string
    add_column :bikes, :handlebar, :string
    add_column :bikes, :stem, :string
    add_column :bikes, :motor, :string
    add_column :bikes, :battery_cyles, :integer
    add_column :bikes, :mileage, :integer
  end
end
