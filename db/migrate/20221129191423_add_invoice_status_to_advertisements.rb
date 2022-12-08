class AddInvoiceStatusToAdvertisements < ActiveRecord::Migration[6.1]
  def change
    add_column :advertisements, :invoice_status, :string
  end
end
