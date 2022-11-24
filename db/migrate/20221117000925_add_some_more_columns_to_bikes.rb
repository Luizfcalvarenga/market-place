class AddSomeMoreColumnsToBikes < ActiveRecord::Migration[6.1]
  def change
    add_column :bikes, :accessories_description, :text
    add_column :bikes, :pedals, :string
    add_column :bikes, :seat_post_model, :string
  end
end
