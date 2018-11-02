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
    after_initialize do |meal|
        # no idea if this is how it works...
        # plan is to set a current user and set user-meal join table row through it
        @user = User.find(session[:user_id])
        @user.meals << meal.meal_id
    end

    def update_calories(input_cals)
        self.update_attributes(:total_calories => :total_calories + input_cals)
    end
end
