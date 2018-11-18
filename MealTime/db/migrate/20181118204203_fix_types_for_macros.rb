class FixTypesForMacros < ActiveRecord::Migration[5.2]
  def up
    #meals
    change_column :meals, :total_fat, :decimal
    change_column :meals, :total_trans_fat, :decimal
    change_column :meals, :total_protein, :decimal
    change_column :meals, :total_carbs, :decimal

    #ingredients
    change_column :ingredients, :total_fat, :decimal
    change_column :ingredients, :trans_fat, :decimal
    change_column :ingredients, :protein, :decimal
    change_column :ingredients, :total_carbs, :decimal

    #recipes 
    change_column :recipes, :total_fat, :decimal
    change_column :recipes, :total_trans_fat, :decimal
    change_column :recipes, :total_protein, :decimal
    change_column :recipes, :total_carbs, :decimal

    #daily_nutrients
    change_column :daily_nutrients, :fat, :decimal
    change_column :daily_nutrients, :protein, :decimal
    change_column :daily_nutrients, :carbs, :decimal

    add_column :daily_nutrients, :trans_fat, :decimal
  end
  def down
    #meals
    change_column :meals, :total_fat, :integer
    change_column :meals, :total_fat, :integer
    change_column :meals, :total_protein, :integer
    change_column :meals, :total_carbs, :integer
    
    #ingredients
    change_column :ingredients, :total_fat, :integer
    change_column :ingredients, :trans_fat, :integer
    change_column :ingredients, :protein, :integer
    change_column :ingredients, :total_carbs, :integer

    #recipes 
    change_column :recipes, :total_fat, :integer
    change_column :recipes, :total_trans_fat, :integer
    change_column :recipes, :total_protein, :integer
    change_column :recipes, :total_carbs, :integer

    #daily_nutrients
    change_column :daily_nutrients, :fat, :integer
    change_column :daily_nutrients, :protein, :integer
    change_column :daily_nutrients, :carbs, :integer
  end

end
