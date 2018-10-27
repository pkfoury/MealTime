class CreateJoinTableIngredientMeal < ActiveRecord::Migration[5.2]
  def change
    create_join_table :ingredients, :meals do |t|
      t.index [:ingredient_id, :meal_id], unique: true
      t.decimal :ammount
      t.references :uom, foreign_key: true
    end
  end
end
