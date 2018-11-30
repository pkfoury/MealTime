module Api
  module V1
      class ProfileController < ApplicationController
          skip_before_action :verify_authenticity_token
        #   skip_before_action :require_token

          def index
              render json: {status: 'SUCCESS', message: 'Hit user votes endpoint', data: @current_user}, status: :ok
          end

          def create
            user = User.find_by(auth_digest: params["Token"])
            if params["body"]["email"]
                user.update_attribute(:email, params["body"]["email"])
            end
            if params["body"]["allergens"]
                puts user.allergens
                # user.update_attribute(:allergens, params["body"]["allergens"])
            end
            render json: {status: 'SUCCESS', message: 'Update profile', data: user}, status: :ok
          end

          private
          def profile_params
              # params.permit(:email, :user_id, :allergens)
          end
      end
  end
end