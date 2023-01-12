class AddCouponToAdvertisement < ActiveRecord::Migration[6.1]
  def change
    add_reference :advertisements, :coupon, foreign_key: true
  end
end
