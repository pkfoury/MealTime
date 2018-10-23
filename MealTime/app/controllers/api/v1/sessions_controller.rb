module Api
    module V1
        class SessionsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def new
                sessions = Sessions.order("id DESC")
            end

            def create
                user = User.find_by(user_name: params[:session][:user_name])
                
                if user && user.authenticate(params[:session][:password])
                    render json: {status: 'SUCCESS', message: 'User Found', data:user}, status: :ok
                    log_in(user)

                else
                    render json: {status: 'Authentication Failed', message: 'Username and password combination does not match', data:user}, status: :unauthorized
                end

            end

            private
                
            def login_params
                params.require(:session).permit(:user_name, :password)
            end
        end
    end
end