class CreateRestaurantHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurant_histories do |t|
      t.date :date_visited, :null => false

      t.timestamps
    end
  end
end
