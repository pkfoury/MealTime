class Meal < ApplicationRecord
    belongs_to :meal_type
    has_many :meals_recipes
    has_many :recipes, through: :meals
    has_many :meals_recipes, dependent: :destroy
    has_many :recipes, through: :meals_recipes
    has_many :meals_users, dependent: :destroy
    has_many :users, through: :meals_users
    has_many :meals_ingredients, dependent: :destroy
    has_many :ingredients, through: :meals_ingredients
    validates :meal_type_id, presence: true
    validates :user_id, presence: true
    validates :date_of_meal, presence: true
    validates :total_calories, :total_fat, :total_trans_fat, :total_cholesterol, presence: true, numericality: { greater_than: 0 }
    validates :total_sodium,  :total_carbs,  :total_protein, presence: true, numericality: { greater_than: 0 }


end
