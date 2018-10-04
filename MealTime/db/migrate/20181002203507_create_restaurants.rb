class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.text :name
      t.text :weblink
      t.text :yelpLink, unique: true
      t.timestamps
    end
  end
end
