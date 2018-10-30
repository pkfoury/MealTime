class AuthenticateUser
    prepend SimpleCommand
    
    def initialize(user_name, password)
        @user_name = user_name
        @password = password
    end

    def call
        JsonWebToken.encode(user_id: user.id) if user
    end

    private

    attr_accessor :user_name, :password

    def user
        user = User.find_by_user_name(user_name)
        return user if user && user.authenticate(password)

        errors.add :user_authentication, 'invalid credentials'
        nil
    end
end