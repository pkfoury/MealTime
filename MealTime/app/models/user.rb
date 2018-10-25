class User < ApplicationRecord
    before_save {self.email = email.downcase}

    # This regex is used widely to verify email formatting
    
    VALID_EMAIL_REG = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

    validates :user_name, presence: true, length: {maximum: 50},
                uniqueness: {case_sensitive: true}
    validates :email, presence: true, length: {maximum: 255}, 
                format: {with: VALID_EMAIL_REG},
                uniqueness: {case_sensitive: false}

    has_secure_password
    validates :password, presence: true, length: {minimum: 6}

    has_one :budget
    has_one :user_location
    has_many :recipes, dependent: :nullify
    has_many :user_votes, dependent: :delete_all
    has_and_belongs_to_many :meals

end
