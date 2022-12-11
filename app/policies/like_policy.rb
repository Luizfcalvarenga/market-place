class LikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end


  def new?
    true
  end

  def create?
    true
  end



  def destroy?
    record.user == user
  end
end
