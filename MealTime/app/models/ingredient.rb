class Ingredient < ApplicationRecord
    has_and_belongs_to_many :allergens
    has_and_belongs_to_many :recipes
end
