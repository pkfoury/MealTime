class DeleteMealsIngredientsJoinTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :ingredients_meals
  end
end
