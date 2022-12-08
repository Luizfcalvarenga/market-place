class PagesController < ApplicationController
  after_action :set_status
  skip_before_action :authenticate_user!, only: [:new_announce]

  def home
  end

  def new_announce
  end



  private

  def set_status
    current_user.update!(status: User.statuses[:offline]) if current_user
  end

end
