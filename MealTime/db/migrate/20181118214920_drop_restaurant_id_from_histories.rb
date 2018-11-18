class DropRestaurantIdFromHistories < ActiveRecord::Migration[5.2]
  def change
    remove_column :restaurant_histories, :restaurant_id
    add_column :restaurant_histories, :yelp_id, :string, :null => false
  end
end
