# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  before_action :disable_turbo, only: [:new, :create]

  # GET /resource/sign_in
  # def new
  #   # binding.pry
  #   super
  # end

  # # POST /resource/sign_in
  # def create

  # end

  # DELETE /resource/sign_out
  def destroy
    # cookies[:user_signed_in].delete
    ActionCable.server.remote_connections.where(current_user: current_user).disconnect
    current_user.update(status: User.statuses[:offline])
    super
  end

  def disable_turbo
    request.variant = :without_turbo
  end
  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

end
