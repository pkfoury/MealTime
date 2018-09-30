class CreateUserVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_votes do |t|
      t.integer :userid
      t.integer :recipeid
      t.binary :vote

      t.timestamps
    end
  end
end
