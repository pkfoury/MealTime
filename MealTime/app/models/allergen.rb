class Allergen < ApplicationRecord
    has_many :allergens_ingredients, dependent: :destroy
    has_many :ingredients, through: :allergens_ingredients
end
