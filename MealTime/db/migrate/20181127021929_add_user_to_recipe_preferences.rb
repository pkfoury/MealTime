class AddUserToRecipePreferences < ActiveRecord::Migration[5.2]
  def change
    add_reference :recipe_preferences, :user, foreign_key: true
  end
end
