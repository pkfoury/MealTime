class AddMoneyAndWeightGoals < ActiveRecord::Migration[5.2]
  def change
    add_column :user_goals, :weight, :integer, :null => false
    add_column :user_goals, :money, :decimal, :null => false, :precision => 8, :scale => 2
  end
end
