class CreateRestaurantDislikes < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurant_dislikes do |t|
      t.belongs_to :user, :null => false
      t.string :yelp_id, :null => false
      t.timestamps
    end
  end
end
