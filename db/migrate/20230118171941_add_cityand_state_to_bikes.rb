class AddCityandStateToBikes < ActiveRecord::Migration[6.1]
  def change
    add_reference :bikes, :city, foreign_key: true
    add_reference :bikes, :state, foreign_key: true
  end
end
