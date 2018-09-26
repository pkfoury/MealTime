class User < ApplicationRecord
    
    # This regex is used widely to verify email formatting
    
    VALID_EMAIL_REG = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

    validates :userName, presence: true, length: {maximum: 50}
    validates :email, presence: true, length: {maximum: 255}, 
                format: { with: VALID_EMAIL_REG},
                uniqueness: {case_sensitive: false}
end
