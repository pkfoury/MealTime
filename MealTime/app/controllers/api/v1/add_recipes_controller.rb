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
          recipe.recipe_name = params["body"]["recipe_name"]
          recipe.instructions = params["body"]["instructions"]
          recipe.cook_time = params["body"]["cook_time"]
          ingredients = params["body"]['ingredients']
          #ingredients.map {|ingredient| Ingredient.new(ingredient_params).save}
          logger.debug "New recipe: #{recipe.attributes.inspect}"
          logger.debug "Recipe should be valid: #{recipe.valid?}"
          if recipe.save
            render json: {status: 'SUCCESS', message: 'Recipe created', data: recipe}, status: :ok
          else
            logger.debug "#{recipe.errors.full_messages}"
            render json: {status: 'ERROR', message: 'Recipe not created', data:recipe.errors.full_messages}, status: :unprocessable_entity
          end
        end
      end
      private
      def recipe_params
        params.permit(:user_id, :recipe_name, :instructions, :cook_time, :creator_comments, :total_calories, :total_fat, :total_trans_fat, :total_cholesterol, :total_sodium, :total_carbs, :total_protein)
      end
      def ingredient_params
        params.permit(:name, :calories, :total_fat, :trans_fat, :cholesterol, :sodium, :total_carbs, :protein)
      end
    end
  end
end
