class AddCheatDayFlagAndCalories < ActiveRecord::Migration[5.2]
  def change
    add_column :user_goals, :cheat_day_calories, :integer, :null => false, :default => 0
    add_column :daily_nutrients, :cheat_day_flag, :boolean, :default => false
  end
end
