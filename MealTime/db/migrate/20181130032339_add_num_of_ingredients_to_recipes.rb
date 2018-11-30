class AddNumOfIngredientsToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :num_ingredients, :int
  end
end
