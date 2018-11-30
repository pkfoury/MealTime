module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
    end

    def remember(user)
        user.remember
        cookies.permanent.signed[:user_id] = user.id
        cookies.permanent[:auth_token] = user.auth_token
    end

    def current_user
        puts params["Token"]
        @current_user = User.find_by(auth_digest: params["Token"])
        # if request.headers["Token"]
        #     @current_user = User.find_by(auth_digest: request.headers["Token"])
        # elsif params["Token"] != nil
        #     tok = params["Token"]
        #     @current_user = User.find_by(auth_digest: tok)
        # else
        #     @current_user = nil
        # end
    end

    # Returns true if current user is logged in and false otherwise

    def logged_in?
        current_user
        !@current_user.nil?
    end

    def forget(user)
        session.delete(:user_id)
        @current_user = nil
    end

    def log_out
        forget(current_user)
        @current_user = nil
    end

end