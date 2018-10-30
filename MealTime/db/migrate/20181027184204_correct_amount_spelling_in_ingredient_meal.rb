class CorrectAmountSpellingInIngredientMeal < ActiveRecord::Migration[5.2]
  def change
    remove_column :ingredients_meals, :ammount
    add_column :ingredients_meals, :amount, :decimal
  end
end
