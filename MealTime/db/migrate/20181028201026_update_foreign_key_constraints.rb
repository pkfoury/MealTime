class UpdateForeignKeyConstraints < ActiveRecord::Migration[5.2]
  def change
    #Budget
    remove_foreign_key :budgets, :users
    add_foreign_key :budgets, :users, on_delete: :cascade

    #Meal
    remove_foreign_key :meals, :meal_types
    add_foreign_key :meals, :meal_types, on_delete: :nullify

    #Recipe
    remove_foreign_key :recipes, :users
    add_foreign_key :recipes, :users, on_delete: :nullify

    #Restaurant_History 
    remove_foreign_key :restaurant_histories, :users
    add_foreign_key :restaurant_histories, :users, on_delete: :cascade

    remove_foreign_key :restaurant_histories, :restaurants
    add_foreign_key :restaurant_histories, :restaurants, on_delete: :cascade

    #User_Location
    remove_foreign_key :user_locations, :users
    add_foreign_key :user_locations, :users, on_delete: :cascade

    #User_Votes
    remove_foreign_key :user_votes, :users
    add_foreign_key :user_votes, :users, :index => true, on_delete: :cascade
    
    remove_foreign_key :user_votes, :recipes
    add_foreign_key :user_votes, :recipes, :index => true, on_delete: :cascade
  end
end
