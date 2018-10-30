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
        if (user_id = session[:user_id])

            puts "Session"
            @current_user ||= User.find_by(id: session[:user_id])
            puts @current_user.user_name

        elsif (user_id = cookies.signed[:user_id])

            puts "Cookies"
            user = User.find_by(id: cookies.signed[:user_id])
            puts user

            if user && user.authenticated?(cookies[:auth_token])
                log_in(user)
                @current_user = user
            end
        end
    end

    # Returns true if current user is logged in and false otherwise

    def logged_in?
        puts @current_user
        !current_user.nil?
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
