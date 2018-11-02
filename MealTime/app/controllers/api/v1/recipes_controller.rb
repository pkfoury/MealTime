module Api
    module V1
        class RecipesController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                recipe = Recipe.order("recipe_name DESC")
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            def show
                recipe = Recipe.find_by(params[:id])
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            # TODO implement this
            def search
                recipe = Recipe.find_by(recipe_name: params["name"])
                render json: {status: 'SUCCESS', message: 'Found a recipe', data:recipe}, status: :ok
            end

            def create
                recipe = Recipe.new(recipe_params) 
                if recipe.save 
                    render json: {status: 'SUCCESS', message: 'Recipe created', data:recipe}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'Recipe not created', data:recipe.errors}, status: :unprocessable_entity
            
                end
            end
            def destroy
                recipe = Recipe.find_by(params[:id])
                recipe.destroy
                render json: {status: 'SUCCESS', message: 'Recipe deleted', data:recipe}, status: :ok

            end
            private 
            def recipe_params
                params.permit(:user_id, :recipe_name, :instructions, :cook_time,:creator_comments)
            end

        end
    end
end
