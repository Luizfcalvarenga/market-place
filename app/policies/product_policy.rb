class ProductPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where.not(user_id: user.id)
    end
  end

  def destroy?
    record.user == user
  end
end
