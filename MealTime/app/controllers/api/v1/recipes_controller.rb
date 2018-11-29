module Api
    module V1
        class RecipesController < ApplicationController
            skip_before_action :verify_authenticity_token
            skip_before_action :require_token
            def index
                recipe = Recipe.order("recipe_name DESC")
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            def show
                recipe = Recipe.find_by(params[:id])
                render json: {status: 'SUCCESS', message: 'Hit Recipes endpoint', data:recipe}, status: :ok
            end

            def search
                recipes = Recipe.all
                render json: {status: 'SUCCESS', message: 'Found a recipe', data:recipes}, status: :ok
            end

            def searchWithFilters
                # TODO: Actually search DB using these filters and return a listing.
                name = params["name"]
                difficulty = params["difficultyFilter"].to_i
                time = params["timeFilter"].to_i
                numIngredients = params["numIngredientsFilter"].to_i
                onlyShowOnwer = params["onlyShowOwnerFilters"]

                p difficulty
                render json: {status: 'SUCCESS', message: 'Searching for recipes with filters.'}, status: :ok
            end
            def recipe_allergens
                recipe = Recipe.joins(ingredients_recipes: {ingredients: {allergens_ingredients: :allergen }}).where.not(allergens: {name: params["allergen_name"]})
                render json: {status: 'SUCCESS', message: 'Searching for recipes that do not contain specified allergen', data: recipe}, status: :ok
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
                params.permit(:user_id, :recipe_name, :instructions, :cook_time,:creator_comments, :allergen_name)
            end
        end
    end
end
