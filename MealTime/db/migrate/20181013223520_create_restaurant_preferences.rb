class CreateRestaurantPreferences < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurant_preferences do |t|
      t.references :user, foreign_key: true
      t.references :restaurant, foreign_key: true
      t.boolean :dislike, :default => false
      
      t.timestamps
    end
  end
end
