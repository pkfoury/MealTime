class Meal < ApplicationRecord
    has_one :meal_type
    has_many :recipes
end
