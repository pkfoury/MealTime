class CreateBudgets < ActiveRecord::Migration[5.2]
  def change
    create_table :budgets do |t|

      t.decimal :weeklyBudget, :null => false, :default => 0.0
      t.decimal :weeklySpending, :null => false, :default => 0.0
      t.decimal :monthlyBudget, :null => false, :default => 0.0
      t.decimal :monthlySpending, :null => false, :default => 0.0
      t.timestamps
    end
  end
end
