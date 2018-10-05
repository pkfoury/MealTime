module Api
    module V1
        class MealsController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                meal = Meal.find(:all, :conditions => {:user_id = params[:id]})
                render json: {status: 'SUCCESS', message: 'Hit meals endpoint', data:meal}, status: :ok
            end

            def show
            end

            def create
            end

            def destroy
            end
        end
    end
end