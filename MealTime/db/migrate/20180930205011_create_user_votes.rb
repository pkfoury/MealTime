class CreateUserVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_votes do |t|

      t.boolean :vote, :null => false

      t.timestamps
    end
  end
end
