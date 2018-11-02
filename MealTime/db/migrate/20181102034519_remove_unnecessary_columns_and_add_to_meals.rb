class RemoveUnnecessaryColumnsAndAddToMeals < ActiveRecord::Migration[5.2]
  def change
    remove_column :ingredients, :ingredients_id
    remove_column :meals, :recipe_id
    add_column :meals, :total_calories, :integer, :default => 0
  end
end
