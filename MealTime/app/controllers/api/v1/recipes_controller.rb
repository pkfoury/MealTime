module Api
    module V1
        class RecipesController < ApplicationController
            skip_before_action :verify_authenticity_token
            #skip_before_action :require_token
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
                recipe = Recipe.find_by(params[:id])
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
                    INNER JOIN ingredients_recipes 
                        ON (recipes.id = ingredients_recipes.recipe_id)
                    INNER JOIN ingredients 
                        ON (ingredients_recipes.ingredient_id = ingredients.id)
                    INNER JOIN allergens_ingredients 
                        ON (ingredients.id = allergens_ingredients.ingredient_id)
                    INNER JOIN allergens 
                        ON (allergens_ingredients.allergen_id = allergens.id)
                WHERE allergens.name != '#{allergen_list[0]}'"
                #concat rest of allergens into the query
                query << add_allergens_to_query(allergen_list[1..-1])
            end
            #if allergen_list contains multiple allergens concat them on to the query
            def add_allergens_to_query(allergen_list)
                ret_string = ''
                allergen_list.each do |allergen|
                    ret_string << %" AND allergens.name != '#{allergen}'"
                end
                return ret_string
            end
            #formats the query with the allergen_list allergens
            def build_query(allergen_list) 
                query = %"SELECT 
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
                    INNER JOIN ingredients_recipes 
                        ON (recipes.id = ingredients_recipes.recipe_id)
                    INNER JOIN ingredients 
                        ON (ingredients_recipes.ingredient_id = ingredients.id)
                    INNER JOIN allergens_ingredients 
                        ON (ingredients.id = allergens_ingredients.ingredient_id)
                    INNER JOIN allergens 
                        ON (allergens_ingredients.allergen_id = allergens.id)
                WHERE allergens.name != '#{allergen_list[0].strip}'"
                #concat rest of allergens into the query
                query << add_allergens_to_query(allergen_list[1..-1])
            end
            #if allergen_list contains multiple allergens concat them on to the query
            def add_allergens_to_query(allergen_list)
                ret_string = ''
                allergen_list.each do |allergen|
                    ret_string << %" AND allergens.name != '#{allergen.strip}'"
                end
                return ret_string
            end
            def add_to_recipe(row)
                temp = Recipe.new()
                temp.recipe_name = row[0]
                temp.instructions = row[1]
                temp.cook_time = row[2]
                temp.creator_comments = row[3]
                temp.total_calories = row[4]
                temp.total_fat = row[5]
                temp.total_trans_fat = row[6]
                temp.total_cholesterol = row[7]
                temp.total_sodium = row[8]
                temp.total_carbs = row[9]
                temp.total_protein = row[10]
                temp.difficulty = row[11]
                return temp

            end
        end
    end
end
