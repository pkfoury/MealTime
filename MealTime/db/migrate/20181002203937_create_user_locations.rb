class CreateUserLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :user_locations do |t|
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
