class Ingredient < ApplicationRecord
    has_many :allergens_ingredients, dependent: :destroy
    has_many :allergens, through: :allergens_ingredients
    has_many :ingredients_recipes, dependent: :destroy
    has_many :recipes, through: :ingredients_recipes
    has_many :meals_ingredients, dependent: :destroy
    has_many :meals, through: :meals_ingredients

    # before_save {
    #     # self.meal.update_nutrition(self.calories, self.total_fat, self.trans_fat, self.cholesterol, self.sodium,
    #     #     self.total_carbs, self.protein)
    #     # self.recipe.update_nutrition(self.calories, self.total_fat, self.trans_fat, self.cholesterol, self.sodium,
    #     #     self.total_carbs, self.protein)
    # }


end
