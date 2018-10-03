class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.date :dateOfMeal
      t.timestamps
    end
    add_reference :meals, :user, foreign_key: true
    add_reference :meals, :recipe, foreign_key: true
  end
end
