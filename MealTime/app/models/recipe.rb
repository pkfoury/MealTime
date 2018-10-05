class Recipe < ApplicationRecord
    has_many :ingredients
    has_many :allergens, through: :ingredient
    has_many :user_votes
    has_one :uom
    belongs_to :user
    #time format regex
    VALID_TIME_FORMAT = /\A((([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])|([0-5][0-9]))\z/ 
    
    validates :recipe_name, presence: true
    validates :cook_time, presence: true, length: {maximum: 5},
                format: {with: VALID_TIME_FORMAT}
    validates :instructions, presence: true




end
