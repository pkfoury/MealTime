class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.text :name
      t.text :web_link
      t.text :yelp_ink, unique: true
      t.timestamps
    end
  end
end
