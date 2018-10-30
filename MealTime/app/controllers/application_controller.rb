class ApplicationController < ActionController::Base
    include SessionsHelper
    before_action :require_token

    private
    def require_token
        unless logged_in?
            puts logged_in?
            render json: {status: "Not logged in", message: "Not logged in"}, status: :unauthorized_user
        end
    end


end
