class Uom < ApplicationRecord
    has_many :recipes, dependent: :destroy
    has_many :ingredients, dependent: :destroy
end
