class AddUserToRecipe < ActiveRecord::Migration[5.2]
  def change
    add_reference :recipes, :user, foreign_key: true
  end
end
