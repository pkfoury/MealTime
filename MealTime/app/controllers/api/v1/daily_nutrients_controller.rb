module Api
    module V1
        class DailyNutrientsController < ApplicationController
            skip_before_action :verify_authenticity_token
            # skip_before_action :require_token

            def index
                user = @current_user
                today = get_today
                puts today
                daily_vals = DailyNutrient.find_by(user_id: user.id, day: today)

                if daily_vals.nil?
                    create
                else
                    render json: {status: "SUCCESS on GET", message: "Daily vals exist", data: daily_vals}, status: :ok
                end
            end

            def show_all
                goals = DailyNutrient.order("user_id DESC")
                render json: {status: "SUCCESS", data: goals}, status: :ok
            end

            def show_day
                user = @current_user
                date = params["day"]
                daily_vals = DailyNutrient.find_by(user_id: user.id, day: date)

                if daily_vals != nil
                    render json: {status: "SUCCESS", message: "Hit show_day", data: daily_vals}, status: :ok
                else
                    render json: {status: "NULL VALS", message: "Values do not exist for that day"}, status: :not_found
                end
            end

            def create
                user = @current_user
                today = get_today

                daily_vals = DailyNutrient.new(user_id: user.id, day: today)

                if daily_vals.save
                    daily_vals.user_id = user.id
                    daily_vals.day = today

                    render json: {status: "SUCCESS", message: "Daily Values are null", data: daily_vals}, status: :ok
                else
                    render json: {status: "FAIL on POST", message: "Daily vals something else idkkk", data:daily_vals}, status: :ok
                end
            end

            def destroy
                daily_nut = DailyNutrient.find(params[:id])
                daily_nut.destroy
                render json: {status: "SUCCESS", message: "Daily Nutrients destroyed", data: daily_nut}, status: :ok
            end

            def update_cheat_day
                user = @current_user
                today = get_today
                daily_val = DailyNutrient.find_by(user_id: user.id, day: today)
                daily_val.toggle(:cheat_day_flag)
                if daily_val.save
                    render json: {status: "SUCCESS", message: "Cheat day flag toggled", data: daily_val}, status: :ok
                else
                    render json: {status: "FAIL on ", message: "Cheat day flag failed to toggle", data: daily_val}, status: :ok
                end
            end

            private

            def nutrient_params
                params.permit(:day, :date)
            end
        end
    end
end
