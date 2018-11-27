class ChangeTrackMacros < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_goals, :track_macro
    add_column :user_goals, :track_macros, :boolean, :default => false
  end
end
