class AddAuthDigest < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :auth_token, :string

    add_column :users, :auth_digest, :string
  end
end
