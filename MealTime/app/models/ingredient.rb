class Ingredient < ApplicationRecord
    has_many :allergens_ingredients, dependent: :destroy
    has_many :allergens, through: :allergens_ingredients
    has_many :ingredients_recipes, dependent: :destroy
    has_many :recipes, through: :ingredients_recipes
    has_many :meals_ingredients, dependent: :destroy
    has_many :meals, through: :meals_ingredients

    


end
