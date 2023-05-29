require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module NuflowShop
  class Application < Rails::Application
    config.generators do |generate|
      generate.assets false
      generate.helper false
      generate.test_framework :test_unit, fixture: false
    end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

		config.middleware.use Rack::Cors do
      allow do
        origins '*'
        resource '*',
          headers: :any,
          expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
          methods: [:get, :post, :options, :delete, :put]
      end
    end





    # config.autoloader = :classic
    # config.after_initialize do |_config|
    #   User.update_all(status: User.statuses[:offline])
    # end


		config.active_job.queue_adapter = :sidekiq
    # config.i18n.default_locale = 'pt-BR'
    config.time_zone = "America/Sao_Paulo"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
