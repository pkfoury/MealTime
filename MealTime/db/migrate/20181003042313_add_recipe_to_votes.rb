class AddRecipeToVotes < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_votes, :recipe, foreign_key: true
  end
end
