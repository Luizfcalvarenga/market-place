class Coupon < ApplicationRecord
  include ApplicationHelper

  validates :redemption_limit, :valid_until, :code, :kind, :discount, presence: true
  validate :valid_date
  validates :redemption_limit, numericality: { greater_than: 0 }
  validates :discount, numericality: { greater_than: 0 }
  validates :code, uniqueness: true
  validate :max_min_discount

  has_many :advertisements

  enum kind: {
    percentage: "percentage",
    fixed: "fixed",
  }, _prefix: :kind



  def expired?
    valid_until < Time.current
  end

  def redemption_limit_exceeded?
    advertisements.count >= redemption_limit
  end

  def discount_display
    kind == "percentage" ? "#{discount}%" : display_price_in_cents(discount.to_f)
  end

  private

  def valid_date
    errors.add(:valid_until, "| Data deve ser maior ou igual a data atual") unless valid_until.present? && valid_until >= Time.current
  end

  def max_min_discount
    if kind == 'percentage'
      errors.add(:discount, " deve ser menor ou igual a 94% ou exatamente 100%") if discount > 94 && discount < 100
    end
  end
end
