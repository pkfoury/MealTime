module Api
    module V1
        class MealsController < ApplicationController
            include MealsHelper
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

                meal_data = params['body']['mealData'] #This is an array of meal items
                user = User.find_by(auth_digest: params["headers"]["Token"])
                user_goals = UserGoal.find_by(user_id: user.id)
                daily_nut = DailyNutrient.find_by(user_id: user.id)
                date = params['body']['date']

                if user && user_goals
                    processMeal(meal_data, daily_nut)
                end

                render json: {status: "SUCCESS", message: "HIT CREATE!", data: daily_nut}, status: :ok
            end

            def destroy
                meal = Meal.find(params[:id])
                meal.destroy
                render json: {status: 'SUCCESS', message: 'Meal deleted', data:meal}, status: :ok
            end

            def daily
              user = User.find_by(auth_digest: params["headers"]["Token"])
              meal = Meal.find_by(user_id: user.user_id, date_of_meal: params["date"])
              render json: {status: 'SUCCESS', message: 'Found a meal', data:meal}, status: :ok
            end

            private
            def meal_params
                params.permit(:user_id, :date_of_meal, :recipe_id, :meal_type_id)
            end

        end
    end
end
