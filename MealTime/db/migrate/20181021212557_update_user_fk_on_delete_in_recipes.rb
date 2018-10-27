class UpdateUserFkOnDeleteInRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :recipes, :users
    add_foreign_key :recipes, :users, dependent: :nullify
  end
end
