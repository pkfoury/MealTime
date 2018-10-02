class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.text :name, null: false
      t.integer :calories, :null => false, :default => 0
      t.integer :totalFat, :null => false, :default => 0
      t.integer :transFat, :null => false, :default => 00
      t.integer :cholesterol, :null => false, :default => 0
      t.integer :sodium, :null => false, :default => 0
      t.integer :totalCarbs, :null => false, :default => 0
      t.integer :protein, :null => false, :default => 0
      t.decimal :servingSize, :null => false
      t.decimal :dvTotalFat, :null => false, :default => 0
      t.decimal :dvTransFat, :null => false, :default => 0
      t.decimal :dvCholesterol, :null => false, :default => 0
      t.decimal :dvSodium, :null => false, :default => 0
      t.decimal :dvCarbs, :null => false, :default => 0
      t.decimal :dvProtein, :null => false, :default => 0
      t.timestamps
    end
  end
end
