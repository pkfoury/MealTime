class DefaultAllDecimalAndIntegerValsInRecipes < ActiveRecord::Migration[5.2]
  def change
    change_column :recipes, :total_calories, :int, :default => 1
    change_column :recipes, :total_fat, :decimal, :default => 1.0
    change_column :recipes, :total_trans_fat, :decimal, :default => 1.0
    change_column :recipes, :total_cholesterol, :int, :default => 1
    change_column :recipes, :total_sodium, :int, :default => 1
    change_column :recipes, :total_carbs, :decimal, :default => 1.0
    change_column :recipes, :total_protein, :decimal, :default => 1.0
  end
end
