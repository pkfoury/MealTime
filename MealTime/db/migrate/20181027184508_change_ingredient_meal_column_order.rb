class ChangeIngredientMealColumnOrder < ActiveRecord::Migration[5.2]
  def change
    change_column :ingredients_meals, :uom_id, :bigint, after: :amount
  end
end
