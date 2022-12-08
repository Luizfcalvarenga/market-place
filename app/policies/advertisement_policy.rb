class AdvertisementPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
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
