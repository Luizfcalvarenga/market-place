class ProductPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where.not(user_id: user.id)
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
end
