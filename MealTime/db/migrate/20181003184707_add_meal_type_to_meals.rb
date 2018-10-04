class AddMealTypeToMeals < ActiveRecord::Migration[5.2]
  def change
    add_reference :meals, :meal_type, foreign_key: true
  end
end
