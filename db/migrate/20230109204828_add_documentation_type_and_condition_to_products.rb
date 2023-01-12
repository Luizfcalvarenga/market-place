class AddDocumentationTypeAndConditionToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :documentation_type, :string
    add_column :products, :condition, :string
  end
end
