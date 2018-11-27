class ChangeMacrosBoolean < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :track_macro
    add_column :user_goals, :track_macro, :boolean
  end
end
