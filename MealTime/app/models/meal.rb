class Meal < ApplicationRecord
    belongs_to :meal_type
    has_many :meals_recipes
    has_many :recipes, through: :meals
    has_many :meals_recipes, dependent: :destroy
    has_many :recipes, through: :meals_recipes
    has_many :meals_users, dependent: :destroy
    has_many :users, through: :meals_users
    has_many :meals_ingredients, dependent: :destroy
    has_many :ingredients, through: :meals_ingredients
    validates :meal_type_id, presence: true
    validates :user_id, presence: true
    validates :date_of_meal, presence: true
    # after_initialize do |meal|
    #     # no idea if this is how it works...
    #     # plan is to set a current user and set user-meal join table row through it
    #     @user = User.find(session[:user_id])
    #     @user.meals << meal.meal_id
    # end

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
