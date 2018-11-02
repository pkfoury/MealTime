class AddCaloriesToRecipe < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :total_calories, :integer
  end
end
