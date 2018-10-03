class Recipe < ApplicationRecord
    has_many :ingredients
    has_many :allergens, through: :ingredient
    has_many :user_votes
    has_one :uom
end
