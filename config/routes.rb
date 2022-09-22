Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  require "sidekiq/web"
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  resources :bikes, only: :index

  get 'new_announce', to: 'pages#new_announce', as: "new_announce"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      get 'users/me', to: 'users#me'

      resources :bikes, only: :index
    end
  end
end
