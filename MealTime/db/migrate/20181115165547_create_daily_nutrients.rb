class CreateDailyNutrients < ActiveRecord::Migration[5.2]
  def change
    create_table :daily_nutrients do |t|
      t.belongs_to :user, on_delete: :cascade
      t.integer :calories, :null => false, :default => 0
      t.integer :protein, :null => false, :default => 0
      t.integer :fat, :null => false, :default => 0
      t.integer :carbs, :null => false, :default => 0

      t.decimal :budget, :null => false, :precision => 8, :scale => 2, :default => 0

      t.timestamps
    end
  end
end
