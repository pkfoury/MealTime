class AddUserIdAndAllergenIdToUserAllergen < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_allergens, :user, index: true
    add_foreign_key :user_allergens, :users
    add_reference :user_allergens, :recipe, index: true
    add_foreign_key :user_allergens, :recipes
  end
end
