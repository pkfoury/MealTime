class AddUserToLocation < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_locations, :user, foreign_key: true
  end
end
