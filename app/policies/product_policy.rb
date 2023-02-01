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

  def edit?
    record.user == user
    raise
  end

  def update?
    record.user == user
    # true
    raise
  end


  def destroy?
    record.user == user
  end


  private
  # def user_is_admin?
  #   user.access == "admin"
  # end
end
