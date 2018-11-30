class MealsRecipe < ApplicationRecord
    validates_presence_of :meal, :recipe

    belongs_to :meal
    belongs_to :recipe
end