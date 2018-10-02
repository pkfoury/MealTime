class CreateUoms < ActiveRecord::Migration[5.2]
  def change
    create_table :uoms do |t|
      t.text :name
      t.string :code
      t.text :description
      
      t.timestamps
    end
  end
end
