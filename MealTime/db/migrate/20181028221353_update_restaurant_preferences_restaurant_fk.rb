class UpdateRestaurantPreferencesRestaurantFk < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :restaurant_preferences, :restaurants
    add_foreign_key :restaurant_preferences, :restaurants, on_delete: :cascade
  end
end
