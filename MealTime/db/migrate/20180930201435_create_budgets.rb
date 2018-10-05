class CreateBudgets < ActiveRecord::Migration[5.2]
  def change
    create_table :budgets do |t|

      t.decimal :weekly_budget, :null => false, :default => 0.0
      t.decimal :weekly_spending, :null => false, :default => 0.0
      t.decimal :monthly_budget, :null => false, :default => 0.0
      t.decimal :monthly_spending, :null => false, :default => 0.0
      t.timestamps
    end
  end
end
