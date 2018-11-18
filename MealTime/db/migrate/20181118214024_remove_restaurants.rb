class RemoveRestaurants < ActiveRecord::Migration[5.2]
  def change
    remove_column :restaurant_preferences, :restaurant_id
  end
end
