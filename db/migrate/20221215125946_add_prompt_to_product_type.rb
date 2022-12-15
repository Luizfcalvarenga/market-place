class AddPromptToProductType < ActiveRecord::Migration[6.1]
  def change
    add_column :product_types, :prompt, :string
  end
end
