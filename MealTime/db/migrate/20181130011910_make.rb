class Make < ActiveRecord::Migration[5.2]
  def change
    change_column :recipes, :total_calories, :int, :default => 0
  end
end
