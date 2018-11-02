class UpdateRestaurantPreferencesFk < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :restaurant_preferences, :users
    add_foreign_key :restaurant_preferences, :users, :index => true, on_delete: :cascade

    remove_foreign_key :restaurant_preferences, :restaurants
    add_foreign_key :restaurant_preferences, :restaurants, :index => true, on_delete: :cascade
  end
end
