module Api
    module V1
        class SessionsController < ApplicationController
            skip_before_action :verify_authenticity_token
            skip_before_action :require_token

            def new
            end

            def create
                user = User.find_by(user_name: params["body"]["user_name"])
                if user && user.authenticate(params["body"]["password"])
                    log_in(user)
                    remember(user)
                    render json: {status: 'SUCCESS', message: 'Session Created', data: user.auth_digest, id: user.id}, status: :ok
                else
                    render json: {status: 'Authentication Failed', message: 'Username and password combination does not match', data:user}, status: :unauthorized
                end
            end

            def destroy
                log_out if logged_in?
                render json: {status: 'SUCCESS', message: 'Return to root page'}, status: :ok
            end

            private
                
            def login_params
                params.require(:session).permit(:user_name, :password)
            end
        end
    end
end