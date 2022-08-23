class CreateBikes < ActiveRecord::Migration[6.1]
  def change
    create_table :bikes do |t|
      t.string :category
      t.integer :age
      t.string :size

      t.timestamps
    end
  end
end
