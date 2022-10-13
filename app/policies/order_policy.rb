class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all.where(user: user)
    end
  end

  def show?
    user == record.user
  end

  def invoice?
    user == record.user
  end

  def status?
    true
  end
end
