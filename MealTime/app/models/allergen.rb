class Allergen < ApplicationRecord
    has_many :allergens_ingredients, dependent: :destroy
    has_many :ingredients, through: :allergens_ingredients
    has_many :user_allergens, dependent: :destroy
    has_many :users, through: :user_allergens

    validates :name, presence: true
end
