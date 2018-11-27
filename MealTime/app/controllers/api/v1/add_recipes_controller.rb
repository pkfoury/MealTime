module Api
  module V1
    class AddRecipesController < ApplicationController
      skip_before_action :verify_authenticity_token
      # skip_before_action :require_token
      def index
        recipe = Recipe.order("created by DESC")
        render json: {status: 'SUCCESS', message: 'Hit recipes endpoint', data: recipe}, status: :ok
      end

      def create
        user = User.find_by(auth_digest: params["headers"]["Token"])
        if User.exists?(auth_digest: params["headers"]["Token"])
          recipe_parse = params["body"]
          recipe = Recipe.new(recipe_params)
          recipe.user_id = user.id
          if recipe.save
            ingredients = params["body"]['ingredients']
            ingredients.map do |ingredient|
              if ingredient["name"]!=""
                new_ingredient = Ingredient.find_by(name: ingredient["name"])
                uom = Uom.find_by(name: ingredient["uom"])
                if Ingredient.exists?(name: ingredient["name"])
                  uom = uom.find_by(name: ingredient["uom"])
                  ingredient_recipe = IngredientsRecipes.new(ingredients_recipes_params)
                  ingredient_recipe.ingredient_id = new_ingredient.id
                  ingredient_recipe.uom_id = uom.id
                  ingredient_recipe.recipe_id = recipe.id
                  ingredient_recipe.amount = ingredient["amount"]
                  ingredient_recipe.save
                else
                  new_ingredient = Ingredient.new(ingredient_params)
                  new_ingredient.name = ingredient["name"]
                  new_ingredient.calories = ingredient["calories"]
                  new_ingredient.total_fat = ingredient["total_fat"]
                  new_ingredient.trans_fat = ingredient["trans_fat"]
                  new_ingredient.cholesterol = ingredient["cholesterol"]
                  new_ingredient.sodium = ingredient["sodium"]
                  new_ingredient.total_carbs = ingredient["total_carbs"]
                  new_ingredient.protein = ingredient["protein"]
                  new_ingredient.serving_size = ingredient["serving_size"]
                  new_ingredient.save
                  if Uom.exists?(name: ingredient["uom"])
                    uom = Uom.find_by(name: ingredient["uom"])
                    ingredient_recipe = IngredientsRecipes.new(ingredients_recipes_params)
                    ingredient_recipe.ingredient_id = new_ingredient.id
                    ingredient_recipe.uom_id = uom_id
                    ingredient_recipe.recipe_id = recipe.id
                    ingredient_recipe.amount = ingredient["amount"]
                    ingredient_recipe.save
                  else
                    uom = Uom.new(uom_params)
                    uom.name = ingredient["uom"]
                    uom.save
                    ingredient_recipe = IngredientsRecipes.new(ingredients_recipes_params)
                    ingredient_recipe.ingredient_id = new_ingredient.id
                    ingredient_recipe.uom_id = uom.id
                    ingredient_recipe.recipe_id = recipe.id
                    ingredient_recipe.amount = ingredient["amount"]
                    ingredient_recipe.save
                  end
                end
              end
            end
            render json: {status: 'SUCCESS', message: 'Recipe created', data:recipe}, status: :ok
          else
            logger.debug "#{recipe.errors.full_messages}"
            render json: {status: 'ERROR', message: 'Recipe not created', data:recipe.errors.full_messages}, status: :unprocessable_entity
          end
        else
          render json: {status: 'ERROR', message: 'Recipe not created', data:user}, status: :unprocessable_entity
        end
      end
      private
      def recipe_params
        params.require(:body).permit(:recipe_name, :instructions, :cook_time, :total_calories, :total_fat, :total_trans_fat, :total_cholesterol, :total_sodium, :total_carbs, :total_protein)
      end
      def ingredient_params
        params.permit(:name, :calories, :total_fat, :trans_fat, :cholesterol, :sodium, :total_carbs, :protein, :serving_size)
      end
      def uom_params
        params.permit(:name)
      end
      def ingredients_recipes_params
        params.permit(:ingredient_id, :recipe_id, :amount, :uom_id)
      end
    end
  end
end
