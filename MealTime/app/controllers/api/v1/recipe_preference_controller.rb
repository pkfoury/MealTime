module Api
    module V1
        class RecipePreferenceController < ApplicationController
            skip_before_action :verify_authenticity_token
            
            def index
                render json: {status: 'SUCCESS', message: 'Hit recipe preference controller', data: @current_user}, status: :ok
            end

            def addFavoritesFromUser
                user = User.find_by(auth_digest: params["Token"])
                recipePreference = RecipePreference.new(preference_params)
                recipePreference.user_id = user.id
                p "DUDDDEEE"
                p params["body"]
                recipePreference.recipe_id = params["body"]["id"]

                if recipePreference.save
                    render json: {status: 'SUCCESS', message: 'Preference saved'}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Preference not created', data:recipePreference.errors}, status: :unprocessable_entity
                end
            end

            def getFavoritesFromUser
                user = User.find_by(id: @current_user.id)
                preferences = RecipePreference.where(user_id: user.id)
                
                recipeData = Array.new
                preferences.each do |recipePreference|
                    recipe = Recipe.find_by(id: recipePreference.recipe_id)
                    recipeData.push(recipe)
                end
                render :json => { status: 'SUCCESS', message: 'Preferences returned.', data: recipeData}, status: :ok
            end

            private 
            def preference_params
                params.permit(:user_id, :recipe_id)
            end
        end
    end
end
