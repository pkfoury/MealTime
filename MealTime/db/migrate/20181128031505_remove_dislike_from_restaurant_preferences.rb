class RemoveDislikeFromRestaurantPreferences < ActiveRecord::Migration[5.2]
  def change
    remove_column :restaurant_preferences, :dislike
  end
end
