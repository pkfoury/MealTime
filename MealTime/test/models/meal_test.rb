require 'test_helper'

class MealTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup:
    @meal Meal.new(:dateOfMeal = "9/18/18", :user_id = 1, :recipe_id = 1)
  end
end
