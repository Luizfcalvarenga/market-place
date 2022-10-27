class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    authorize @user

    @chat = Chat.new
    @rooms = Chat.all

  end
end
