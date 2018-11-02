class UserAllergen < ApplicationRecord
    belongs_to :allergens
    belongs_to :users
end
