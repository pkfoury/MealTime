class ApplicationController < ActionController::Base
    include SessionsHelper
    include ApplicationHelper
    
    before_action :require_token

    private
    def require_token
        / Get the token here then check based on the token if logged in, then we should be good/
        unless logged_in?
            render json: {status: "Not logged in", message: "Not logged in"}, status: :unauthorized_user
        end
    end


end
