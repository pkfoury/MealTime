class AddCreatedAndUpdatedFields < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :allergens_ingredients
    add_timestamps :ingredients_recipes
    add_timestamps :meals_users
  end
end
