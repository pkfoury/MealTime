module Api
    module V1
        class RecipesController < ApplicationController
            skip_before_action :verify_authenticity_token
            #skip_before_action :require_token
            def index
                recipe = Recipe.order("recipe_name DESC")
                render json: {status: 'SUCCESS', message: 'Pulling all recipes desc.', data:recipe}, status: :ok
            end

            def show
                recipe = Recipe.find_by(id: params[:id])
                render json: {status: 'SUCCESS', message: 'Finding recipe', data:recipe}, status: :ok
            end

            def search
                recipes = Recipe.all
                render json: {status: 'SUCCESS', message: 'Found a recipe', data:recipes}, status: :ok
            end

            def searchWithFilters
                name = "%" + params["name"] + "%"

                if params["name"] == "none"
                    recipes = Recipe.all
                else
                    recipes = Recipe.where("recipe_name like ?", name);
                end

                render json: {status: 'SUCCESS', message: 'Searching for recipes with filters.', data: recipes}, status: :ok
            end
            def recipe_allergens
                recipe = []
                #remove [] if in the string
                params[:allergen_name].tr!('[]','')
                #split input string by ',' if a list of allergens are provided
                allergen_list = params[:allergen_name].split(',')

                records_array = ActiveRecord::Base.connection.execute(build_query(allergen_list))

                records_array.each do |row|
                    recipe << add_to_recipe(row)
                end
                # recipe = Recipe.joins(ingredients_recipes: {ingredients: {allergens_ingredients: :allergen }}).where.not(allergens: {name: params[:allergen_name]})
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
                recipe = Recipe.find_by(id: params[:id])
                recipe.destroy
                render json: {status: 'SUCCESS', message: 'Recipe deleted', data:recipe}, status: :ok

            end
            private
            def recipe_params
                params.permit(:user_id, :recipe_name, :instructions, :cook_time,:creator_comments, :difficulty, :allergen_name)
            end
            #formats the query with the allergen_list allergens
            def build_query(allergen_list)
                query = %"SELECT
                    recipes.id,
                    recipes.recipe_name,
                    recipes.instructions,
                    recipes.cook_time,
                    recipes.creator_comments,
                    recipes.total_calories,
                    recipes.total_fat,
                    recipes.total_trans_fat,
                    recipes.total_cholesterol,
                    recipes.total_sodium,
                    recipes.total_carbs,
                    recipes.total_protein,
                    recipes.difficulty
                FROM recipes
                    LEFT JOIN ingredients_recipes
                        ON (recipes.id = ingredients_recipes.recipe_id)
                    LEFT JOIN ingredients
                        ON (ingredients_recipes.ingredient_id = ingredients.id)
                    LEFT JOIN allergens_ingredients
                        ON (ingredients.id = allergens_ingredients.ingredient_id)
                    LEFT JOIN allergens
                        ON (allergens_ingredients.allergen_id = allergens.id)
                WHERE allergens.id != #{allergen_list[0].strip}"
                #concat rest of allergens into the query
                query << add_allergens_to_query(allergen_list[1..-1])
                query << ' OR allergens.id IS NULL'
            end
            #if allergen_list contains multiple allergens concat them on to the query
            def add_allergens_to_query(allergen_list)
                ret_string = ''
                allergen_list.each do |allergen|
                    ret_string << %" AND allergens.id != '#{allergen.strip}'"
                end
                return ret_string
            end
            def add_to_recipe(row)
                temp = Recipe.new()
                temp.id = row['id']
                temp.recipe_name = row['recipe_name']
                temp.instructions = row['instructions']
                temp.cook_time = row['cook_time']
                temp.creator_comments = row['creator_comments']
                temp.total_calories = row['total_calories']
                temp.total_fat = row['total_fat']
                temp.total_trans_fat = row['total_trans_fat']
                temp.total_cholesterol = row['total_cholesterol']
                temp.total_sodium = row['total_sodium']
                temp.total_carbs = row['total_carbs']
                temp.total_protein = row['total_protein']
                temp.difficulty = row['difficulty']
                return temp

            end
        end
    end
end
