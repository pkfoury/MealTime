class AddIndexToIngredients < ActiveRecord::Migration[5.2]
  def change
    add_column :ingredients, :ingredients_id, :bigint
  end
end