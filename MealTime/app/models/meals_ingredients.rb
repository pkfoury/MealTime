class MealsIngredient < ApplicationRecord
    validates_presence_of :meal, :ingredient
    
    belongs_to :allergen
    belongs_to :meal

    
end
