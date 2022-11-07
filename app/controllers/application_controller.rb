class ApplicationController < ActionController::Base
	include Pundit

	before_action :authenticate_user!, unless: :auth_request?

	after_action :verify_authorized, except: :index, unless: :skip_pundit?
	after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?
	skip_before_action :verify_authenticity_token

  before_action :current_order
  before_action :set_current_user

	private

  def turbo_frame_request_variant
    request.variant = :turbo_frame if turbo_frame_request?
  end

  def set_current_user
    Current.user = current_user
  end
  
  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name, :document_number, :phone_number, :cep, :address])

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :document_number, :phone_number, :cep, :address])
  end

  def current_order
    cookies[:tracker_code] = SecureRandom.uuid if cookies[:tracker_code].blank?

    if current_user.present?
      Order.find_or_create_by(user: current_user, status: :pending)
    else
      Order.find_or_create_by(tracker_code: cookies[:tracker_code], status: :pending)
    end
  end
  helper_method :current_order


	def skip_pundit?
		devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)|(^auth$)/
	end

	def auth_request?
		params[:controller].include?("devise_token_auth") &&
			((controller_name == "sessions" && action_name == "create") ||
			(controller_name == "registrations" && action_name == "create"))
	end
end
