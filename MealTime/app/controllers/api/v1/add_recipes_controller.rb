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
        user = User.find_by(auth_digest: params["Token"])
        if User.exists?(auth_digest: params["Token"])
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
                  if Allergen.exists?(name: ingredient["allergen"])
                    allergen = Allergen.find_by(name: ingredient["allergen"])
                    if AllergensIngredient.exists?(allergen_id: allergen.id, ingredient_id: new_ingredient.id)
                    else
                      allergen = Allergen.find_by(name: ingredient["allergen"])
                      allergen_ingredient = AllergensIngredient.new(allergens_ingredients_params)
                      allergen_ingredient.ingredient_id = new_ingredient.id
                      allergen_ingredient.allergen_id = allergen.id
                      allergen_ingredient.save
                    end
                  else
                    allergen = Allergen.new(allergen_params)
                    allergen.name = ingredient["allergen"]
                    if allergen.save
                      puts "Allergen successfully saved #{allergen.name}"
                      allergen_ingredient = AllergensIngredient.new(allergens_ingredients_params)
                      allergen_ingredient.ingredient_id = new_ingredient.id
                      allergen_ingredient.allergen_id = allergen.id
                      if allergen_ingredient.save
                        puts "allergen_ingredient saved #{allergen_ingredient.allergen_id}"
                      else
                        put "Allergen_ingredient failed to save #{allergen_ingredient.errors.full_messages}"
                      end
                    else
                      puts "Allergen failed to save #{allergen.errors.full_messages}"
                    end
                  end
                  uom = Uom.find_by(name: ingredient["uom"])
                  if Uom.exists?(name: ingredient["uom"])
                  else
                    uom = Uom.new(uom_params)
                    uom.name = ingredient["uom"]
                    uom.save
                  end
                  uom = Uom.find_by(name: ingredient["uom"])
                  ingredient_recipe = IngredientsRecipe.new(ingredients_recipes_params)
                  ingredient_recipe.ingredient_id = new_ingredient.id
                  ingredient_recipe.uom_id = uom.id
                  ingredient_recipe.recipe_id = recipe.id
                  ingredient_recipe.amount = ingredient["amount"]
                  if ingredient_recipe.save
                    puts "Ingredient recipe saved #{ingredient_recipe.ingredient_id}"
                  else
                    puts "Ingredient recipe failed to save #{ingredient_recipe.errors.full_messages}"
                  end
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
                  if new_ingredient.save
                    puts "Ingredient saved #{new_ingredient.name}"\

                    if ingredient["allergen"] != nil
                      if Allergen.exists?(name: ingredient["allergen"])
                        allergen = Allergen.find_by(name: ingredient["allergen"])
                        if AllergensIngredient.exists?(allergen_id: allergen.id, ingredient_id: new_ingredient.id)
                        else
                          allergen = Allergen.find_by(name: ingredient["allergen"])
                          allergen_ingredient = AllergensIngredient.new(allergens_ingredients_params)
                          allergen_ingredient.ingredient_id = new_ingredient.id
                          allergen_ingredient.allergen_id = allergen.id
                          if allergen_ingredient.save
                            puts "Allergen Ingredient saved #{allergen_ingredient.allergen_id}"
                          else
                            puts "Allergen Ingredient failed to save #{allergen_ingredient.errors.full_messages}"
                          end
                        end
                      else
                        allergen = Allergen.new(allergen_params)
                        allergen.name = ingredient["allergen"]
                        if allergen.save
                          puts "Allergen saved #{allergen.name}"
                          allergen_ingredient = AllergensIngredient.new(allergens_ingredients_params)
                          allergen_ingredient.ingredient_id = new_ingredient.id
                          allergen_ingredient.allergen_id = allergen.id
                          if allergen_ingredient.save
                            puts "Allergen ingredient saved #{allergen_ingredient.allergen_id}"
                          else
                            puts "Allergen Ingredient failed to save #{allergen_ingredient.errors.full_messages}"
                          end
                        end
                      end
                    end
                    if Uom.exists?(name: ingredient["uom"])
                      uom = Uom.find_by(name: ingredient["uom"])
                      ingredient_recipe = IngredientsRecipe.new(ingredients_recipes_params)
                      ingredient_recipe.ingredient_id = new_ingredient.id
                      ingredient_recipe.uom_id = uom_id
                      ingredient_recipe.recipe_id = recipe.id
                      ingredient_recipe.amount = ingredient["amount"]
                      if ingredient_recipe.save
                        puts "Ingredient Recipe saved #{ingredient_recipe.ingredient_id}"
                      else
                        puts "Ingredient Recipe failed to save #{ingredient_recipe.errors.full_messages}"
                      end
                    else
                      uom = Uom.new(uom_params)
                      uom.name = ingredient["uom"]
                      if uom.save
                        puts "UOM saved #{uom.name}"
                        ingredient_recipe = IngredientsRecipe.new(ingredients_recipes_params)
                        ingredient_recipe.ingredient_id = new_ingredient.id
                        ingredient_recipe.uom_id = uom.id
                        ingredient_recipe.recipe_id = recipe.id
                        ingredient_recipe.amount = ingredient["amount"]
                        if ingredient_recipe.save
                          puts "INgredient recipe saved #{ingredient_recipe.ingredient_id}"
                        else
                          puts "Ingredient Recipe failed to save #{ingredient_recipe.errors.full_messages}"
                        end
                      else
                        puts "UOM failed to save #{uom.errors.full_messages}"
                      end
                    end
                  else
                    puts "Ingredient failed to save #{new_ingredient.errors.full_messages}"
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
        params.require(:body).permit(:recipe_name, :instructions, :cook_time, :total_calories, :total_fat, :total_trans_fat, :total_cholesterol, :total_sodium, :total_carbs, :total_protein,  :difficulty, :num_ingredients)
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
      def allergen_params
        params.permit(:name)
      end
      def allergens_ingredients_params
        params.permit(:ingredient_id, :allergen_id)
      end
    end
  end
end
