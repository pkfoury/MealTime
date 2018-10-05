module Api
    module V1
        class SessionsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def new
            end

            def create
                console.log(login_params)
                user = User.find_by(u_name)
                if user
                    console.log("Success!");
                else
                    flash[:danger] = "Invalid email/password combination"
                    render 'new'
                end

                render json: {status: 'SUCCESS', message: 'Hit users endpoint'}, status: :ok
            end

            private
                
            def login_params
                params.permit(:user_name, :password)
            end
        end
    end
end