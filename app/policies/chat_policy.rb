class ChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(is_private: true)
    end
  end

  def show?
    true
  end

  def create?
    true
  end
end
