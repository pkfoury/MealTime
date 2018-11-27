module Api
    module V1
        class DailyNutrientsController < ApplicationController
            skip_before_action :verify_authenticity_token
            # skip_before_action :require_token

            def index
                user = @current_user
                daily_vals = DailyNutrient.find_by(user_id: user.id)

                if daily_vals == nil
                    render json: {status: "VALS DONT EXIST", message: "Daily vals do not exist"}, status: :ok
                else
                    render json: {status: "SUCCESS on GET", message: "Daily vals exist", data: daily_vals}, status: :ok
                end
            end

            def show_all
                goals = DailyNutrient.order("user_id DESC")
                render json: {status: "SUCCESS", data: goals}, status: :ok
            end

            def create
                user = @current_user
                daily_vals = DailyNutrient.new(user_id: user.id)

                if daily_vals.save
                    daily_vals.user_id = user.id
                    render json: {status: "SUCCESS", message: "Daily Values are null", data: daily_vals}, status: :ok
                else
                    render json: {status: "FAIL on POST", message: "Daily vals something else idkkk", data:daily_vals}, status: :ok
                end
            end
        end
    end
end