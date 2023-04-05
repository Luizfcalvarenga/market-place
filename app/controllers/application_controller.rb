class ApplicationController < ActionController::Base
  before_action :store_user_location!, if: :storable_location?
	include Pundit::Authorization
  before_action :turbo_frame_request_variant
	before_action :authenticate_user!, unless: :auth_request?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_current_user

	skip_before_action :verify_authenticity_token

	after_action :verify_authorized, except: :index, unless: :skip_pundit?
	after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?
  helper_method :current_controller?

  def current_controller?(names)
    names.include?(params[:controller]) unless params[:controller].blank? || false
  end

	private

  def display_price(price_in_cents)
    number_to_currency(price_in_cents.to_f/100, unit: "R$", separator: ",", delimiter: ".")
  end

  def turbo_frame_request_variant
    request.variant = :turbo_frame if turbo_frame_request?
  end

  def set_current_user
    if current_user.present?
      Current.user = current_user
    end
  end

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name, :document_number, :phone_number, :cep, :address, :show_contact])

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :document_number, :phone_number, :cep, :address, :show_contact])
  end

  def original_url
    base_url + original_fullpath
  end

	def skip_pundit?
		devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)|(^auth$)/
	end

	def auth_request?
		params[:controller].include?("devise_token_auth") &&
			((controller_name == "sessions" && action_name == "create") ||
			(controller_name == "registrations" && action_name == "create"))
	end

  def storable_location?
    request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
  end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end
end
