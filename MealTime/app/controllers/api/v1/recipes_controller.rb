module Api
    module V1
        class RecipesController < ApplicationController
            def index
                recipe = Recipe.order("recipe_name DESC")
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            def show
            end

            def create
            end

            def destroy
            end

            def update
            end

            private 
            def recipe_params
                params.permit()
            end

        end
    end
end
