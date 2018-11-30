class AllergensIngredient < ApplicationRecord
    validates_presence_of :allergen, :ingredient

    belongs_to :allergen
    belongs_to :ingredient
end