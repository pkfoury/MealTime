class RestaurantPreference < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  def changepreference(restaurant_id, preference)
    self.where(:restaurant_id = restaurant_id).update_attribute(:dislike preference)
  end
end
