class UpdateMealsUserFk < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :meals, :users
    add_foreign_key :meals, :users, on_delete: :cascade
  end
end
