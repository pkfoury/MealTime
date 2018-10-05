module Api
    module V1
        class RecipesController < ApplicationController
            def index
                recipe = Recipe.order("recipe_name DESC")
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            def show
                recipe = Recipe.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            def create
                recipe = Recipe.new(recipe_params)  
            end

            def destroy
            end

            def update
            end

            private 
            def recipe_params
                params.require(:recipe_name, :instructions, :cook_time).permit(:creator_comments)
            end

        end
    end
end
