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
        self.meal.update_nutrition(self.total_calories, self.total_fat, self.total_trans_fat, self.total_cholesterol, self.total_sodium,
            self.total_carbs, self.total_protein)
    }
    def update_nutrition(input_cals, total_fat, trans_fat, cholesterol, sodium, total_carbs, protein)
        self.update_attributes(:total_calories => :total_calories + input_cals,
            :total_fat => :total_fat + total_fat,
            :trans_fat => :trans_fat + trans_fat,
            :cholesterol => :cholesterol + cholesterol,
            :sodium => :sodium + sodium,
            :total_carbs => :total_carbs + total_carbs,
            :protein => :protein + protein)
    end



end
