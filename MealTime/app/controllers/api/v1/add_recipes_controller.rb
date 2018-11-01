module Api
    module V1
      class AddRecipesController < ApplicationController

        skip_before_action :verify_authenticity_token

        def index
          recipe = request.headers["Token"]
          render json: {status: 'SUCCESS', message: 'Hit recipes endpoint', data: recipe}, status: :ok
        end

        def new
          recipe = Recipe.new(add_parameters)

        end

        def create

        end

        def add_parameters
          params.permit(:user_id, :recipe_name, :instructions, :cook_time, :ingredients)
        end
      end
    end
end
