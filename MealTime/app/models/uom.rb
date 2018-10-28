class Uom < ApplicationRecord
    has_many :recipes
    has_many :ingredients
end
