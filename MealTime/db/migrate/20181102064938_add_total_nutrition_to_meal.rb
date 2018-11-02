class AddTotalNutritionToMeal < ActiveRecord::Migration[5.2]
  def change
    add_column :meals, :total_fat, :integer
    add_column :meals, :total_trans_fat, :integer
    add_column :meals, :total_cholesterol, :integer
    add_column :meals, :total_sodium, :integer
    add_column :meals, :total_carbs, :integer
    add_column :meals, :total_protein, :integer
  end
end
