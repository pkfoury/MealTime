module Api
    module V1
        class UserVotesController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                vote = UserVote.order("user_id DESC")
                render json: {status: 'SUCCESS', message: 'Hit user votes endpoint', data:vote}, status: :ok
            end

            def show
                vote = UserVote.where(:user_id => params[:id])
                render json: {status: 'SUCCESS', message: 'Hit user votes endpoint', data:vote}, status: :ok
            end

            def create
                vote = UserVote.new(vote_params) 
                if vote.save 
                    render json: {status: 'SUCCESS', message: 'User vote created', data:vote}, status: :ok
                else
                    render json: {status: 'ERROR', message: 'User vote created', data:vote.errors}, status: :unprocessable_entity
            
                end
            end

            def destroy
                vote = UserVote.find(params[:id])
                vote.destroy
                render json: {status: 'SUCCESS', message: 'Vote deleted', data:vote}, status: :ok
            end

            private
            def vote_params
                params.permit(:vote, :user_id, :recipe_id)
            end
        end
    end
end