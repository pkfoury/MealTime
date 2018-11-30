module Api
    module V1
        class UserGoalsController < ApplicationController
            skip_before_action :verify_authenticity_token
            # skip_before_action :require_token
            
            def index
                goals = UserGoal.find_by(user_id: @current_user.id)
                render json: {status: "SUCCESS", message: "Hit index", data: @current_user ,goals_data: goals}, status: :ok
            end

            def show
                goals = UserGoal.order("id DESC")
                render json: {status: "SUCCESS", message: "Hit index", goals_data: goals}, status: :ok
            end

            def create
                user = User.find_by(auth_digest: params["Token"])

                if User.exists?(auth_digest: params["Token"])

                    goals = UserGoal.new(goals_params)
                    goals.user_id = user.id
                    puts goals.track_macros

                    if goals.save
                        render json: {status: "SUCCESS", data: goals}, status: :ok
                    else
                        render json: {status: "Goals did not save", data: user}, status: :unprocessable_entity
                        puts goals.errors.full_messages
                    end


                end
            end

            def update
                user = User.find_by(auth_digest: params["Token"])
                goals = UserGoal.find_by(user_id: @current_user.id)
                if params["body"]["calories"]
                    goals.calories = params["body"]["calories"]
                end
                if params["body"]["carbs"]
                    goals.carbs = params["body"]["carbs"]
                end
                if params["body"]["fat"]
                    goals.fat = params["body"]["fat"]
                end
                if params["body"]["protein"]
                    goals.protein = params["body"]["protein"]
                end
                if params["body"]["weight"]
                    goals.weight = params["body"]["weight"]
                end
                if params["body"]["money"]
                    goals.money = params["body"]["money"]
                end
                goals.save
                render json: {status: "SUCCESS", message: "Goals updated"}, status: :ok
                
            end

            def destroy
                goals = UserGoal.find(params[:id])
                goals.destroy
                render json: {status: "SUCCESS", message: "Goal deleted", data: goals}, status: :ok
            end

            private

            def goals_params
                params.require(:body).permit(:calories, :weight, :money, :fat, :carbs, :protein, :track_macros, :cheat_day_calories)
            end
        end
    end
end
