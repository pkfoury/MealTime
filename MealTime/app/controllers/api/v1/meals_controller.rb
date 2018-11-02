module Api
    module V1
        class MealsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                #this method will soon be only accessable by admins
                meal = Meal.order("user_id DESC")
                render json: {status: 'SUCCESS', message: 'Hit meals endpoint', data:meal}, status: :ok
            end

            def show
                meal = Meal.where(:user_id => params[:id])
                render json: {status: 'SUCCESS', message: 'Hit meals endpoint', data:meal}, status: :ok
            end

            def create
                p "MEAL PARAMS: "
                p params["body"]
            end

            def destroy
                meal = Meal.find(params[:id])
                meal.destroy
                render json: {status: 'SUCCESS', message: 'Meal deleted', data:meal}, status: :ok
            end

            def daily
              meal = Meal.find_by(user_id: params["id"], date_of_meal: params["date"])
              render json: {status: 'SUCCESS', message: 'Found a meal', data:meal}, status: :ok
            end

            private
            def meal_params
                params.permit(:user_id, :date_of_meal, :recipe_id, :meal_type_id)
            end

        end
    end
end
