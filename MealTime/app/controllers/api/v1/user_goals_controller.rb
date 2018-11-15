module Api
    module V1
        class UserGoalsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index

                goals = UserGoal.find_by(user_id: @current_user.id)
                render json: {status: "SUCCESS", message: "Hit index", data: @current_user, goals_data: goals}, status: :ok
            end

            def create
                user = User.find_by(auth_digest: params["headers"]["Token"])

                if User.exists?(auth_digest: params["headers"]["Token"])

                    goals = UserGoal.new(goals_params)
                    goals.user_id = user.id

                    if goals.save
                        render json: {status: "SUCCESS", data: goals}, status: :ok
                    else
                        render json: {status: "Goals did not save", data: user}, status: :unprocessable_entity
                        puts goals.errors.full_messages
                    end

                    
                end
            end

            def update
                user = User.find_by(auth_digest: params["headers"]["Token"])
                goals = UserGoal[user.id]
            end

            private

            def goals_params
                params.require(:body).permit(:calories, :weight, :money, :fat, :carbs, :protein)
            end
        end
    end
end