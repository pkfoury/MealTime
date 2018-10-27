class CreateJoinTableUserMeals < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :meals do |t|
      # t.index [:user_id, :meal_id]
      # t.index [:meal_id, :user_id]
    end
  end
end
