class AddRestaurantToRestaurantHistory < ActiveRecord::Migration[5.2]
  def change
    add_reference :restaurant_histories, :restaurant, foreign_key: true
  end
end
