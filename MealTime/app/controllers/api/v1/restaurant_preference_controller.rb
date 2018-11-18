module Api
    module V1
        class RestaurantPreferenceController < ApplicationController
            skip_before_action :verify_authenticity_token
            
            def index
                render json: {status: 'SUCCESS', message: 'Hit restaurant preference controller', data: @current_user}, status: :ok
            end

            def addFavoritesFromUser
                user = User.find_by(auth_digest: params["headers"]["Token"])
                restaurantPreference = RestaurantPreference.new(preference_params);
                restaurantPreference.user_id = user.id 
                
                if restaurantPreference.save
                    render json: {status: 'SUCCESS', message: 'Preference saved'}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Preference not created'}, status: :unprocessable_entity
                end
            end

            def getFavoritesFromUser
                preferences = RestaurantPreference.find_by(user_id: params["user_id"])
                render json: {status: 'SUCCESS', message: 'Found a recipe', data:preferences}, status: :ok
            end
  
            private
            def preference_params
                params.permit(:restaurant_id)
            end
        end
    end
end
