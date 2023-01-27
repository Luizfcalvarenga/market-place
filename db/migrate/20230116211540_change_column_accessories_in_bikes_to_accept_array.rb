class ChangeColumnAccessoriesInBikesToAcceptArray < ActiveRecord::Migration[6.1]
  def change
    change_column :bikes, :accessories, :string, array: true, default: [], using: "(string_to_array(accessories, ','))"
  end
end
