Rails.application.routes.draw do
  get 'sessions/new'
  namespace 'api' do
    namespace 'v1' do

      resources :users
      get '/users/all', to: 'users#show_all'

      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      get '/daily_nutrients', to: 'daily_nutrients#index'
      get '/daily_nutrients/date', to: 'daily_nutrients#show_day'
      get '/daily_nutrients/all', to: 'daily_nutrients#show_all'
      post '/daily_nutrients', to: 'daily_nutrients#create'
      patch '/daily_nutrients', to: 'daily_nutrients#update'
      patch '/daily_nutrients/update_cheat_day', to: 'daily_nutrients#update_cheat_day'
      delete '/daily_nutrients/:id', to: 'daily_nutrients#destroy'

      resources :aws

      get '/user_goals', to: 'user_goals#index'
      get '/user_goals/all', to: 'user_goals#show'
      post '/user_goals/update', to: 'user_goals#update'
      post '/user_goals', to: 'user_goals#create'
      delete '/user_goals/:id', to: 'user_goals#destroy'

      resources :recipes

      get '/recipe_allergens/:name/:allergen_name', to: "recipes#recipe_allergens"
      get '/search', to: 'recipes#search'
      get '/searchWithFilters/:name', to: 'recipes#searchWithFilters' # This is for the find recipes page for anybody wondering.

      post '/add_recipes', to: 'add_recipes#create'
      resources :meals

      get '/get-meals-for-day/:dateTime', to: 'meals#show'
      post '/add-meal', to: 'meals#create'
      resources :user_votes

      get '/profile', to: 'profile#index'
      post '/profile', to: 'profile#create'
      get '/meals/:id/:date', to: 'meals#daily'
      resources :allergens

      post '/restaurant_preference/', to: 'restaurant_preference#addFavoritesFromUser'
      get '/get_restaurant_preferences/', to: 'restaurant_preference#getFavoritesFromUser'
      post '/recipe_preference/', to: 'recipe_preference#addFavoritesFromUser'
      get '/get_recipe_preferences/', to: 'recipe_preference#getFavoritesFromUser'
      post '/restaurant_dislikes/', to: 'restaurant_dislike#create'
      get '/restaurant_dislikes/', to: 'restaurant_dislike#getDislikes'
    end
  end
end
