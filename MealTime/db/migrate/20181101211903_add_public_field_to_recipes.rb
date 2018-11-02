class AddPublicFieldToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :public, :boolean, :default => false
  end
end
