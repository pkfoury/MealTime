class AddUserToRestaurantHistory < ActiveRecord::Migration[5.2]
  def change
    add_reference :restaurant_histories, :user, foreign_key: true
  end
end
