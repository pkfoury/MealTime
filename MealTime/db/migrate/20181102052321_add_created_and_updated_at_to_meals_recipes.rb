class AddCreatedAndUpdatedAtToMealsRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :meals_recipes, :created_at, :datetime, :null => false
    add_column :meals_recipes, :updated_at, :datetime, :null => false
  end
end
