class ChatsController < ApplicationController
  before_action :authenticate_user!
  def index
    @chats = policy_scope(Chat)
    @users = User.all_except(current_user)

  end
end
