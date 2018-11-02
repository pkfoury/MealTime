class CreateUserAllergens < ActiveRecord::Migration[5.2]
  def change
    create_table :user_allergens do |t|

      t.timestamps
    end
  end
end
