module Api
    module V1
        class IngredientsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                ingredient = Ingredient.order("created_at DESC").last
                render json: {status: 'SUCCESS', message: 'Ingredient endpoint hit', data: ingredient}, status: :ok
            end
        end
    end
end