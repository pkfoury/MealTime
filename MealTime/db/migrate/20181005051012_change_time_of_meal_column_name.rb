class ChangeTimeOfMealColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :meals, :dateOfMeal, :date_of_meal
  end
end
