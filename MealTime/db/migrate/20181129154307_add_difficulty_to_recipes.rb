class AddDifficultyToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :difficulty, :int
  end
end
