class ReformJoinTables < ActiveRecord::Migration[5.2]
  def change
    drop_table :allergens_ingredients
    drop_table :ingredients_recipes
    drop_table :meals_users
    create_table :allergens_ingredients do |t|
      t.belongs_to :allergen, :null => false, :index => true
      t.belongs_to :ingredient, :null => false, :index => true   
    end

    create_table :ingredients_recipes do |t|
      t.belongs_to :ingredient, :null => false, :index => true
      t.belongs_to :recipe, :null => false, :index => true
      t.decimal :amount
      t.references :uom, foreign_key: true
    end

    create_table :meals_users do |t|
      t.belongs_to :meal, :null => false, :index => true
      t.belongs_to :user, :null => false, :index => true
    end

    create_table :meals_recipes do |t|
      t.belongs_to :meal, :null => false, :index => true
      t.belongs_to :recipe, :null => false, :index => true
      t.decimal :portion_count
    end
  end
end
