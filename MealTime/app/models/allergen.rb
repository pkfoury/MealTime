class Allergen < ApplicationRecord
    has_and_belongs_to_many :ingredient
end
