class AddUserForeignKeyToUserVotes < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_votes, :user, foreign_key: true
  end
end
