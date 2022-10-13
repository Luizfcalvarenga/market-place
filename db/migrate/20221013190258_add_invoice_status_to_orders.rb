class AddInvoiceStatusToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :invoice_status, :string
  end
end
