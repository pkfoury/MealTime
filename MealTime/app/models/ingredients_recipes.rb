class IngredientsRecipe < ApplicationRecord
    validates_presence_of :ingredient, :recipe
    
    belongs_to :ingredient
    belongs_to :recipe
end