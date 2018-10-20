class Meal < ApplicationRecord
    has_one :meal_type
    has_many :recipes
    has_and_belongs_to_many :users
    after_intitialize do |meal|:

    end
end
