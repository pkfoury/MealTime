class UpdateRestaurantPreferencesUserFk < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :restaurant_preferences, :users
    add_foreign_key :restaurant_preferences, :users, on_delete: :cascade
  end
end
