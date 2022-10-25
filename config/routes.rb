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

  resources :bikes do
    resource :order_items, only: [:new, :create, :destroy]

  end

  resource :order_items, only: [ :destroy ], as: :destroy
  resource :bikes, only: [ :destroy ], as: :remove

  resources :products do
    resource :order_items, only: [:new, :create, :destroy]
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

  resource :profiles

  # resource :products

  get 'my_products', to: 'products#my_products', as: "my_products"
  get 'search/product_type', to: 'products#search', as: "search"

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
