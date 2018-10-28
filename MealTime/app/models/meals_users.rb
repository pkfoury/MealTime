class MealsUsers < ApplicationRecord
    validates_presence_of :meal, :user

    belongs_to :meal
    belongs_to :user
end