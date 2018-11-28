class SetUserIdCascade < ActiveRecord::Migration[5.2]
  def change
    remove_column :restaurant_dislikes, :user_id
    add_reference :restaurant_dislikes, :user, index: true, on_delete: :cascade
  end
end
