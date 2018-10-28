class Meal < ApplicationRecord
    belongs_to :meal_type
    has_many :recipes
    has_and_belongs_to_many :users
    after_initialize do |meal|
        # no idea if this is how it works...
        # plan is to set a current user and set user-meal join table row through it
        @user = User.find(session[:user_id])
        @user.meals << meal.meal_id
    end
end
