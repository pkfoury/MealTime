module Api
    module V1
      class AddRecipesController < ApplicationController
        def new
        end

        def create
          recipe = Recipe.find_by(recipe_name: params[:recipe_name])

        def add_params
          params.permit(:ingredients, :recipe_name, :instructions, :cook_time)
