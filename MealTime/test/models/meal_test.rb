require 'test_helper'

class MealTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @meal = Meal.new(date_of_meal: "9/18/18", user_id: 1, recipe_id: 1)
  end

  test "should have meal associated with user" do
    assert_not @meal.users.empty?
  end
end
