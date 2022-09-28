Rails.application.routes.draw do
  devise_for :users, controllers: {
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
  }
  root to: 'pages#home'

  require "sidekiq/web"
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  resources :bikes
  resources :products
  # resources :product_types
  get 'get_types_of_product', to: 'product_types#get_types_of_product'



  get 'new_announce', to: 'pages#new_announce', as: "new_announce"

  resource :profiles
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      get 'users/me', to: 'users#me'

      resources :bikes, only: :index
      resources :products
    end
  end
end
