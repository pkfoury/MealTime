module Api
  module V1
    class AddRecipesController < ApplicationController
      skip_before_action :verify_authenticity_token
      skip_before_action :require_token
      def index
        recipe = Recipe.order("created by DESC")
        render json: {status: 'SUCCESS', message: 'Hit recipes endpoint', data: recipe}, status: :ok
      end

      def create
        recipe = Recipe.new(recipe_params)
        ingredients = Ingredient.find_by(name: params["body"]["ingredients"]["name"])
        logger.debug "New recipe: #{recipe.attributes.inspect}"
        logger.debug "Recipe should be valid: #{recipe.valid?}"
        if recipe.save
          render json: {status: 'SUCCESS', message: 'Recipe created', data: recipe}, status: :ok
        else
          logger.debug "#{recipe.errors.full_messages}"
          render json: {status: 'ERROR', message: 'Recipe not created', data:recipe.errors.full_messages}, status: :unprocessable_entity
        end
      end
      private
      def recipe_params
        params.permit(:user_id, :recipe_name, :instructions, :cook_time, :creator_comments)
      end
    end
  end
end
