Rails.application.routes.draw do
  get 'users/show'
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
  resources :chats do
    resources :messages
  end

  get 'user/:id', to: 'users#show', as: 'user'
  resources :advertisements, only: [:index, :show, :destroy]
  get "advertisements/:id/invoice", to: "advertisements#invoice", as: "advertisement_invoice"
  get "advertisements/:id/status", to: "advertisements#status", as: "advertisement_status", format: :json

  resources :bikes

  resource :order_items, only: [ :destroy ], as: :destroy
  resource :bikes, only: [ :destroy ], as: :remove

  resources :products

  namespace :admin do
    resources :users
    resources :advertisements do
      patch :approve
      patch :reject
    end
    # resources :users, only: [:index, :new, :create]

    # get 'partners/:slug/edit', to: 'partners#edit', as: "partner_slug_edit"
    # patch 'partners/:slug/toggle_active', to: 'partners#toggle_active', as: "partner_toggle_active"

    # get 'approve/:entity_class/:entity_id', to: 'admin#approve_form', as: "approve_form"
    # patch 'approve/:entity_class/:entity_id', to: 'admin#approve', as: "approve"
  end


  resources :product_attributes
  post 'create_attribute_for_product', to: 'product_attributes#create_attribute_for_product'


  get 'get_information_for_new_product', to: 'products#get_information_for_new_product'
  get 'get_attributes_for_product', to: 'product_type_attributes#get_attributes_for_product'
  get 'get_product_attributes', to: 'product_attributes#get_product_attributes'

  get 'get_information_for_new_bike', to: 'bikes#get_information_for_new_bike'


  resources :orders, only: [ :index, :show ]
  get "orders/:id/invoice", to: "orders#invoice", as: "order_invoice"
  get "orders/:id/status", to: "orders#status", as: "order_status", format: :json


  get 'new_announce', to: 'pages#new_announce', as: "new_announce"
  # get 'search', to: 'pages#search', as: "search"


  resource :profiles

  # resource :products

  get 'my_products', to: 'products#my_products', as: "my_products"
  # get 'search', to: 'products#search', as: "search"

  # delete 'my_products/product/:id', to: 'profiles#destroy'


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      get 'users/me', to: 'users#me'

      resources :bikes
      resources :products
    end
  end
end
