class UserGoalsEdit < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_goals, :cholesterol
    remove_column :user_goals, :trans_fat
    remove_column :user_goals, :sodium
  end
end
