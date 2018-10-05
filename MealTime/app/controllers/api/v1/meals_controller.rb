module Api
    module V1
        class MealsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                #meal = Meal.order("user_id DESC")
                meal = Meal.where(:user_id => params[:id])
                render json: {status: 'SUCCESS', message: 'Hit meals endpoint', data:meal}, status: :ok
            end

            def show
                meal = Meal.where(:user_id => params[:id])
                render json: {status: 'SUCCESS', message: 'Hit meals endpoint', data:meal}, status: :ok
            end

            def create
            end

            def destroy
            end
        end
    end
end