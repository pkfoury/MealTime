class MealType < ApplicationRecord
    has_many :meals, dependent: :nullify
end
