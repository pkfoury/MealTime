class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.text :recipeName, :null => false
      t.text :instructions, :null => false
      t.time :cookTime
      t.text :creatorComments, :null => false, :default => ""
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
