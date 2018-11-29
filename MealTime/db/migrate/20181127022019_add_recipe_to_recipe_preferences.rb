class AddRecipeToRecipePreferences < ActiveRecord::Migration[5.2]
  def change
    add_reference :recipe_preferences, :recipe, foreign_key: true
  end
end
