Rails.application.routes.draw do
  get 'sessions/new'
  namespace 'api' do
    namespace 'v1' do

      resources :users
      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'

      resources :aws

      get '/user_goals', to: 'user_goals#index'
      patch '/user_goals', to: 'user_goals#update'
      post '/user_goals', to: 'user_goals#create'

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
      get '/meals/:date', to: 'meals#daily'

      post '/restaurant_preference/', to: 'restaurant_preference#addFavoritesFromUser'
      get '/get_restaurant_preferences/', to: 'restaurant_preference#getFavoritesFromUser'
    end
  end
end
