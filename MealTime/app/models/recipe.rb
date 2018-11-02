class Recipe < ApplicationRecord
    has_many :ingredients_recipes, dependent: :destroy
    has_many :ingredients, through: :ingredients_recipes
    has_many :allergens, through: :ingredient
    has_many :user_votes, dependent: :destroy
    belongs_to :user
    has_many :meals_recipes, dependent: :destroy
    has_many :meals, through: :meals_recipes
    #time format regex
    VALID_TIME_FORMAT = /\A((([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])|([0-5][0-9]))\z/ 
    
    validates :recipe_name, presence: true
    validates :cook_time, presence: true, length: {maximum: 5},
                format: {with: VALID_TIME_FORMAT}
    validates :instructions, presence: true
    before_save {
        self.meal.update_calories(self.total_calories)
    }



end
