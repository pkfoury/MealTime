class CreateRecipePreferences < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_preferences do |t|

      t.timestamps
    end
  end
end
