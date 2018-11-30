module Api
    module V1
        class RestaurantPreferenceController < ApplicationController
            skip_before_action :verify_authenticity_token
            
            def index
                render json: {status: 'SUCCESS', message: 'Hit restaurant preference controller', data: @current_user}, status: :ok
            end

            def addFavoritesFromUser
                user = User.find_by(auth_digest: params["Token"])
                restaurantPreference = RestaurantPreference.new(preference_params);
                restaurantPreference.user_id = user.id 
                restaurantPreference.yelp_id = params["body"]["yelp_id"]

                if restaurantPreference.save
                    render json: {status: 'SUCCESS', message: 'Preference saved'}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Preference not created', data:restaurantPreference.errors}, status: :unprocessable_entity
                end
            end

            def getFavoritesFromUser
                user = User.find_by(id: @current_user.id)
                preferences = RestaurantPreference.where(user_id: user.id)
                render :json => { status: 'SUCCESS', message: 'Preferences returned.', data: preferences}, status: :ok
            end

            private 
            def preference_params
                params.permit(:user_id, :yelp_id)
            end
        end
    end
end
