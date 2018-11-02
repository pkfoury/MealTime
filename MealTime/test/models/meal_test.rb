require 'test_helper'

class MealTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @meal = Meal.new(date_of_meal: "2018-9-10", total_calories: 200, user_id: 1, meal_type_id: 1,)
  end

  test "meal is valid" do
    flunk("lol")
  end
end
