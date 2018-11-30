module Api
    module V1
        class UsersController < ApplicationController
            skip_before_action :verify_authenticity_token
            # skip_before_action :require_token

            def index
                tok = params["Token"]
                user = User.find_by(auth_digest: tok)
                render json: {status: 'Hit users index', data: user}, status: :ok
            end

            def show
                users = User.order("id DESC")
                render json: {status: "SUCCESS", data: users}, status: :ok
            end

            def create
                user = User.new(user_params)
                if user.save
                    render json: {status: 'SUCCESS', message: 'User Created', data:user, id: user.id}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'User not created', data:user.errors.full_messages}, status: :unprocessable_entity
                end
            end

            def update
                user = User.find_by(auth_digest: params["Token"])
                param = params["param"]
                if user
                    if params["body"]["showMacros"] == true
                        user.track_macro = true
                        render json: {status: 'TRUE', message: 'Macro boolean flipped'}, status: :ok
                    else
                        render json: {status: 'FALSE', message: 'Macros are false'}, status: :ok
                    end
                end

            end

            def destroy
                user = User.find(params[:id])
                user.destroy
                render json: {status: 'SUCCESS', message: 'User deleted', data:user}, status: :ok
            end

            private

            def user_params
                params.permit(:user_name, :email, :password, :password_confirmation)
            end
        end
    end
end
