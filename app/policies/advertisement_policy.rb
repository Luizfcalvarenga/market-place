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

  def update?
    user == record.user || user_is_admin?
  end

  def invoice?
    user == record.user
  end

  def status?
    true
  end

  private

  def user_is_admin?
    user.access == "admin"
  end
end
