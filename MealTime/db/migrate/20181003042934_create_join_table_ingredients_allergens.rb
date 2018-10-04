class CreateJoinTableIngredientsAllergens < ActiveRecord::Migration[5.2]
  def change
    create_join_table :ingredients, :allergens do |t|
       t.index :ingredient_id
       t.index :allergen_id
    end
  end
end
