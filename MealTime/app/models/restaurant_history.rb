class RestaurantHistory < ApplicationRecord
    belongs_to :user
    belongs_to :restaurant
end
