class CreateUserVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_votes do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :recipe, index: true, foreign_key: true
      t.boolean :vote, :null => false

      t.timestamps
    end
  end
end
