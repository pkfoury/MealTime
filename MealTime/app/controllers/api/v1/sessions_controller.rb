module Api
    module V1
        class SessionsController < ApplicationController
            skip_before_action :verify_authenticity_token

            def new
                # if logged_in
                #     render json: {status: "Logged in", message: "User is logged in", data: current_user} status: :ok
                # else
                #     render json: {status: "Not Logged", message: "User is not logged in"} status: :unauthorized
                # end
            end

            def create
                user = User.find_by(user_name: params[:session][:user_name])

                # @current_user = AuthenticateApiRequest.call(request.headers).result
                # render json: { error: 'Not Authorized' }, status: 401 unless @current_user

                if user && user.authenticate(params[:session][:password])
                    log_in(user)
                    remember(user)
                    render json: {status: 'SUCCESS', message: 'Session Created', data: user.auth_digest}, status: :ok
                else
                    render json: {status: 'Authentication Failed', message: 'Username and password combination does not match', data:user}, status: :unauthorized
                end

            end

            def destroy
                log_out if logged_in?
                render json: {status: 'Logout', message: 'Return to root page'}, status: :ok
            end


            private
                
            def login_params
                params.require(:session).permit(:user_name, :password)
            end
        end
    end
end