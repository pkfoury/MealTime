Rails.application.routes.draw do
  get 'sessions/new'
  namespace 'api' do
    namespace 'v1' do

      resources :users
      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'


      post '/daily_nutrients', to: 'daily_nutrients#create'
      patch '/daily_nutrients', to: 'daily_nutrients#update'
      get '/daily_nutrients', to: 'daily_nutrients#index'
      get '/daily_nutrients/all', to: 'daily_nutrients#show_all'
      patch '/daily_nutrients/cheat_day', to: 'daily_nutrients#cheat_day'

      resources :aws

      get '/user_goals', to: 'user_goals#index'
      get '/user_goals/all', to: 'user_goals#show'
      patch '/user_goals', to: 'user_goals#update'
      post '/user_goals', to: 'user_goals#create'
      delete '/user_goals/:id', to: 'user_goals#destroy'

      resources :recipes
      get '/search/:name', to: 'recipes#search'
      get '/searchWithFilters/:name/:difficultyFilter/:timeFilter/:numIngredientsFilter/:onlyShowOwnerFilters', to: 'recipes#searchWithFilters' # This is for the find recipes page for anybody wondering.
      resources :add_recipes
      resources :meals

      get '/get-meals-for-day/:dateTime', to: 'meals#show'
      post '/add-meal', to: 'meals#create'
      resources :user_votes

      get '/profile', to: 'profile#index'
      post '/profile', to: 'profile#create'
      get '/meals/:id/:date', to: 'meals#daily'

      post '/restaurant_preference/', to: 'restaurant_preference#addFavoritesFromUser'
      get '/get_restaurant_preferences/', to: 'restaurant_preference#getFavoritesFromUser'
    end
  end
end
