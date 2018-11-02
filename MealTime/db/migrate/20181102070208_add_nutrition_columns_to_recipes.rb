class AddNutritionColumnsToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :total_fat, :integer
    add_column :recipes, :total_trans_fat, :integer
    add_column :recipes, :total_cholesterol, :integer
    add_column :recipes, :total_sodium, :integer
    add_column :recipes, :total_carbs, :integer
    add_column :recipes, :total_protein, :integer
  end
end
