class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.text :name, null: false
      t.integer :calories, :null => false, :default => 0
      t.integer :total_fat, :null => false, :default => 0
      t.integer :trans_fat, :null => false, :default => 00
      t.integer :cholesterol, :null => false, :default => 0
      t.integer :sodium, :null => false, :default => 0
      t.integer :total_carbs, :null => false, :default => 0
      t.integer :protein, :null => false, :default => 0
      t.decimal :serving_size, :null => false
      t.decimal :dvTotal_fat, :null => false, :default => 0
      t.decimal :dvTrans_fat, :null => false, :default => 0
      t.decimal :dv_cholesterol, :null => false, :default => 0
      t.decimal :dv_sodium, :null => false, :default => 0
      t.decimal :dv_sarbs, :null => false, :default => 0
      t.decimal :dv_protein, :null => false, :default => 0
      t.timestamps
    end
  end
end
