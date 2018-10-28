class Restaurant < ApplicationRecord
    has_many :restaurant_histories, dependent: :nullify
    has_many :restaurant_preferences, dependent: :destroy
end
