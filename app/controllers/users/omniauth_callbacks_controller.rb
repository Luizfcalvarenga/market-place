class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def sso_provider
    # Retrieve the authentication data from the callback request
    auth_data = request.env['omniauth.auth']

    # Process the authentication data as needed
    # Extract the relevant user information from auth_data and save it to the User model

    # Example: Retrieve email and provider-specific data from auth_data
    email = auth_data['info']['email']
    provider_data = auth_data['extra']['provider_specific_data']

    # Example: Find or create the user based on the email
    user = User.find_or_create_by(email: email)

    # Example: Update user attributes with provider-specific data
    user.update(provider_data: provider_data)

    # Sign in the user
    sign_in_and_redirect user, event: :authentication
  end
end
