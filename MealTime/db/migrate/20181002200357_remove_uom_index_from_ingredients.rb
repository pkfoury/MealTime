class RemoveUomIndexFromIngredients < ActiveRecord::Migration[5.2]
  def change
    remove_index :ingredients, :uom_id
    remove_column :ingredients, :uom_id, :string
  end
end
