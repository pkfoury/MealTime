class ChangeColumnNamesInIngredients < ActiveRecord::Migration[5.2]
  def change
    rename_column :ingredients, :dvTotal_fat, :dv_total_fat
    rename_column :ingredients, :dvTrans_fat, :dv_trans_fat
    rename_column :ingredients, :dv_sarbs, :dv_carbs
  end
end
