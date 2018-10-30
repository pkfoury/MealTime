Rails.application.routes.draw do
  get 'sessions/new'
  namespace 'api' do
    namespace 'v1' do
      resources :users
      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      resources :recipes
      get '/add-recipe', to: 'add_recipes#new'
      post '/add-recipe', to: 'add_recipes#submit'
      resources :meals
      resources :user_votes
    end
  end
end
