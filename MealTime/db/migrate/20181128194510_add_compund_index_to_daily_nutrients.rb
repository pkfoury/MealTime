class AddCompundIndexToDailyNutrients < ActiveRecord::Migration[5.2]
  def change
    add_column :daily_nutrients, :day, :string, :null => false, :defualt => "MM/DD/YY"
    add_index :daily_nutrients, [:user_id, :day], :unique => true
  end
end
