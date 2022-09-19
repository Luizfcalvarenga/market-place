class AddCategoryAndServiceToBikes < ActiveRecord::Migration[6.1]
  def change
    add_reference :bikes, :category, null: false, foreign_key: true
    add_reference :bikes, :service, foreign_key: true

  end
end
