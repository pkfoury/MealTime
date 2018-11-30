class User < ApplicationRecord
    before_save {self.email = email.downcase}
    attr_accessor :auth_token

    before_create {
        self.auth_token = SecureRandom.urlsafe_base64
    }

    # This regex is used widely to verify email formatting
    
    VALID_EMAIL_REG = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

    validates :user_name, presence: true, length: {maximum: 50},
                uniqueness: {case_sensitive: true}
    validates :email, presence: true, length: {maximum: 255}, 
                format: {with: VALID_EMAIL_REG},
                uniqueness: {case_sensitive: false}

    has_secure_password
    validates :password, presence: true, length: {minimum: 6}

    has_one :budget, dependent: :destroy
    has_one :user_location, dependent: :destroy
    has_one :user_goal, dependent: :destroy
    has_many :recipes, dependent: :nullify
    has_many :user_votes, dependent: :destroy
    has_many :restaurant_preferences, dependent: :destroy
    has_many :restaurant_dislikes, dependent: :destroy
    has_many :restaurant_histories, dependent: :destroy
    has_many :meals_users, dependent: :destroy
    has_many :meals, through: :meals_users
    has_many :user_allergens, dependent: :destroy
    has_many :allergens, through: :users

    # This will digest and hash a given string

    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    # This will keep track of the user from the database during sessions

    def remember
        self.auth_token = User.new_token
        update_attribute(:auth_digest, User.digest(auth_token))
    end

    # Creates and returns a new auth_token

    def User.new_token
        SecureRandom.urlsafe_base64
    end

    # This function will return true if the token matches up with the digest to ensure that
    # the user is in a new session

    def authenticated?(auth_token)
        return false if auth_digest.nil?
        BCrypt::Password.new(auth_digest).is_password?(auth_token)
    end

    # def forget_user
    #     update_attribute(:auth_digest, nil)
    # end

end
