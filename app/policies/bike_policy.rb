class BikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end
  def new?
    true
  end

  def create?
    true
  end

  def edit?
    update?
  end

  def update?
    true
  end

  def destroy?
    record.user == user
  end

  def toggle_bike_verify?
    user_is_admin?
  end

  private
  def user_is_admin?
    user.access == "admin"
  end
end
