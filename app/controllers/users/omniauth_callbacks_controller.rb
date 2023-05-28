class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])
    sign_in_and_redirect @user
  end

  # protected

  # def after_omniauth_failure_path_for(_scope)
  #   new_user_session_path
  # end

  # def after_sign_in_path_for(resource_or_scope)
  #   stored_location_for(resource_or_scope) || root_path
  # end
end
