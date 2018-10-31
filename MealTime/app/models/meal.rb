class Meal < ApplicationRecord
    belongs_to :meal_type
    has_many :meals_recipes
    has_many :recipes, through: :meals
    has_many :meals_recipes, dependent: :destroy
    has_many :recipes, through: :meals_recipes
    has_many :meals_users, dependent: :destroy
    has_many :users, through: :meals_users
    after_initialize do |meal|
        # no idea if this is how it works...
        # plan is to set a current user and set user-meal join table row through it
        @user = User.find(session[:user_id])
        @user.meals << meal.meal_id
    end
end
