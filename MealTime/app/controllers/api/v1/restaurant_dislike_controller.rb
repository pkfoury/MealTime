module Api
    module V1
        class RestaurantDislikeController < ApplicationController
            skip_before_action :verify_authenticity_token
            
            def index
                render json: {status: 'SUCCESS', message: 'Hit restaurant dislike controller', data: @current_user}, status: :ok
            end

            def create
                user = User.find_by(auth_digest: params["headers"]["Token"])
                restaurantDislike = RestaurantDislike.new(preference_params);
                restaurantDislike.user_id = user.id 
                restaurantDislike.yelp_id = params["body"]["yelp_id"]

                if restaurantDislike.save
                    render json: {status: 'SUCCESS', message: 'Preference saved'}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Preference not created', data:restaurantDislike.errors}, status: :unprocessable_entity
                end
            end

            def getDislikes
                user = User.find_by(id: @current_user.id)
                dislikes = RestaurantDislike.where(user_id: user.id)
                render :json => { status: 'SUCCESS', message: 'Dislikes returned.', data: dislikes}, status: :ok
            end

            private 
            def preference_params
                params.permit(:user_id, :yelp_id)
            end
        end
    end
end
