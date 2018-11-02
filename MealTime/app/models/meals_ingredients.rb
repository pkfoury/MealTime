class MealsIngredients < ApplicationRecord
    validates_presence_of :meal_id, :ingredient_id
    
    belongs_to :allergen
    belongs_to :meal

    
end
