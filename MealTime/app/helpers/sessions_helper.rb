module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
        remember(user)
    end

    def remember(user)
        user.remember
        cookies.permanent.signed[:user_id] = user.id
        cookies.permanent[:auth_token]= user.auth_token
    end

    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id])
        
        elsif cookies.signed[:user_id]
            user = User.find_by(id: cookies.singed[:user_id])

            if user && user.authenticated?(cookies[:auth_token])
                log_in user
                @current_user = user
            end
        end
    end

    # Returns true if current user is logged in and false otherwise

    def logged_in?
        !current_user.nil?
    end

    def forget(user)
        user.forget
        cookies.delete(:user_id)
        cookies.delete(:auth_token)
    end

    def log_out
        forget(current_user)
        @current_user = nil
    end

end
