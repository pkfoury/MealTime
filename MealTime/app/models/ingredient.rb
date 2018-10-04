class Ingredient < ApplicationRecord
    has_many :allergens
    has_many :recipes
end
