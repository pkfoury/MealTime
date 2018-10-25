class UpdateMealTypeFkOnDeleteInMeal < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :meals, :meal_types
    add_foreign_key :meals, :meal_types, on_delete: :nullify
  end
end
