class CreateUserGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :user_goals do |t|
      t.belongs_to :user, on_delete: :cascade
      t.integer :calories, :null => false
      t.integer :fat, :null => false, :default => -1
      t.integer :trans_fat, :null => false, :default => -1
      t.integer :cholesterol, :null => false, :default => -1
      t.integer :sodium, :null => false, :default => -1
      t.integer :carbs, :null => false, :default => -1
      t.integer :protein, :null => false, :default => -1

      t.timestamps
    end
  end
end
