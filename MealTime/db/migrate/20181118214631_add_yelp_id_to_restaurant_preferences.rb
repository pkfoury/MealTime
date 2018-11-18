class AddYelpIdToRestaurantPreferences < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurant_preferences, :yelp_id, :string, :null => false
  end
end
