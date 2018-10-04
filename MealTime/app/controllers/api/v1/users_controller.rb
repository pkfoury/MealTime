module Api
    module V1
        class UsersController < ApplicationController
            skip_before_action :verify_authenticity_token

            def index
                users = User.order("created_at DESC")
                render json: {status: 'SUCCESS', message: 'Hit users endpoint', data:users}, status: :ok
            end

            def show
                user = User.find(params[:id])
                render json: {status: 'SUCCESS', message: 'Hit users endpoint', data:user}, status: :ok
            end

            def create
                user = User.new(user_params)

                if user.save
                    render json: {status: 'SUCCESS', message: 'User Created', data:user}, status: :ok

                else
                    render json: {status: 'ERROR', message: 'User not created', data:user.errors}, status: :unprocessable_entity 
                end
            end

            def destroy
                user = User.find(params[:id])
                user.destroy
                render json: {status: 'SUCCESS', message: 'User deleted', data:user}, status: :ok
            end

            private

            def user_params
                params.permit(:userName, :email, :password, :password_confirmation)
            end
        end
    end
end