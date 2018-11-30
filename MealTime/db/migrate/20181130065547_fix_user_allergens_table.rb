class FixUserAllergensTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :user_allergens, :recipe_id, :allergen_id
  end
end
