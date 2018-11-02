Rails.application.routes.draw do
  get 'sessions/new'
  namespace 'api' do
    namespace 'v1' do
      resources :users
      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      resources :recipes
      get '/search/:name', to: 'recipes#search'
      resources :add_recipes
      resources :meals
      get '/get-meals-for-day/:dateTime', to: 'meals#show'
      post '/add-meal', to: 'meals#create'
      resources :user_votes
      get '/meals/:id/:date', to: 'meals#daily'
    end
  end
end
