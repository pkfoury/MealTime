class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.text :recipe_name, :null => false
      t.text :instructions, :null => false
      t.time :cook_time
      t.text :creator_comments, :null => false, :default => ""
      t.timestamps
    end
  end
end
