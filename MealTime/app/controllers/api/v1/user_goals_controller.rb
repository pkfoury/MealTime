module Api
    module V1
        class UserGoalsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def create
                user = User.find_by(auth_digest: params["headers"]["Token"])
                puts user.user_name
                if user
                    goals = UserGoal.new(goals_params)
                    puts goals_params
                    if goals.save
                        render json: {status: "Create Hit", data: goals}, status: :ok
                    else
                        render json: {status: "Goals did not save", data: user}, status: :ok
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