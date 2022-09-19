class CreateBikes < ActiveRecord::Migration[6.1]
  def change
    create_table :bikes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :modality
      t.string :price_in_cents
      t.string :quantity
      t.string :locality
      t.string :frame_brand
      t.string :model
      t.string :year
      t.string :frame_size
      t.string :frame_material
      t.string :rim_size
      t.integer :number_of_front_gears
      t.integer :number_of_rear_gears
      t.string :brake_type
      t.string :suspension_type
      t.string :front_suspension_travel
      t.string :rear_suspension_travel
      t.string :seat_post_type
      t.string :seat_post_travel
      t.float :weight
      t.string :bike_conditions
      t.string :structural_visual_condition
      t.string :opareting_condition
      t.string :documentation_type
      t.boolean :accessories
      t.string :battery
      t.text :description

      t.timestamps
    end
  end
end
