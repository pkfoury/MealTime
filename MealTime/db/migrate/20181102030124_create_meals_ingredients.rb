class CreateMealsIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :meals_ingredients do |t|
      t.belongs_to :meal, :null => false, :index => true
      t.belongs_to :ingredient, :null => false, :index => true
      t.decimal :portion_count
      t.timestamps
    end
  end
end
