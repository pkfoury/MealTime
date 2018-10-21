class UpdateCookTimeInRecipes < ActiveRecord::Migration[5.2]
  def change
    change_column :recipes, :cook_time, :string
  end
end
