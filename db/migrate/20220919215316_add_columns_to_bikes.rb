class AddColumnsToBikes < ActiveRecord::Migration[6.1]
  def change
    add_reference :bikes, :user, null: false, foreign_key: true
    add_reference :bikes, :category, null: false, foreign_key: true
    add_reference :bikes, :service, foreign_key: true
    add_column :bikes, :modality, :string
    add_column :bikes, :price_in_cents, :integer
    add_column :bikes, :quantity, :integer
    add_column :bikes, :locality, :string
    add_column :bikes, :frame_brand, :string
    add_column :bikes, :model, :string
    add_column :bikes, :year, :string
    add_column :bikes, :frame_size, :string
    add_column :bikes, :frame_material, :string
    add_column :bikes, :rim_size, :string
    add_column :bikes, :number_of_front_gears, :integer
    add_column :bikes, :number_of_rear_gears, :integer
    add_column :bikes, :brake_type, :string
    add_column :bikes, :suspension_type, :string
    add_column :bikes, :front_suspension_travel, :string
    add_column :bikes, :rear_suspension_travel, :string
    add_column :bikes, :seat_post_type, :string
    add_column :bikes, :seat_post_travel, :string
    add_column :bikes, :weight, :float
    add_column :bikes, :bike_conditions, :string
    add_column :bikes, :structural_visual_condition, :string
    add_column :bikes, :opareting_condition, :string
    add_column :bikes, :documentation_type, :string
    add_column :bikes, :accessories, :boolean
    add_column :bikes, :battery, :string
    add_column :bikes, :description, :text
  end
end
