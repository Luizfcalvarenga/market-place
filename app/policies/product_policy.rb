class ProductPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # def new?
  #   true
  # end

  def create?
    true
  end

  # def edit?
  #   record.user == user
  #   # raise
  # end

  def update?
    # record.user == user || user_is_admin?
    true
  end


  def destroy?
    record.user == user
  end

  def toggle_product_verify?
    user_is_admin?
  end


  private
  def user_is_admin?
    user.access == "admin"
  end
end
