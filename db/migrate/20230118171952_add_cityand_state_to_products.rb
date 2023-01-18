class AddCityandStateToProducts < ActiveRecord::Migration[6.1]
  def change
    add_reference :products, :city, foreign_key: true
    add_reference :products, :state, foreign_key: true
  end
end
