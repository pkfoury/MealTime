class AddRatingToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :rating, :string
  end
end
