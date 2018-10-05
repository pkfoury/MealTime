Rails.application.routes.draw do
  get 'sessions/new'
  namespace 'api' do
    namespace 'v1' do
      resources :users
      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/login', to: 'sessions#destroy'
      resources :recipes
      resources :meals
      resources :user_votes
    end
  end
end
