class RestaurantPreference < ApplicationRecord
  belongs_to :user

  def changepreference(restaurant_id, preference)
    # self.where(:restaurant_id = restaurant_id).update_attribute(:dislike preference)
  end
end
