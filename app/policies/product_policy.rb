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

  def toggle_medium_activity?
    user.access == "admin"
  end


  private
  def user_is_admin?
    user.access == "admin"
  end
end
