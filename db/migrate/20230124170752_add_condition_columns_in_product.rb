class AddConditionColumnsInProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :product_condition_status, :string
    add_column :products, :product_condition_description, :string
  end
end
