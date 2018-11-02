require 'test_helper'

class BudgetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @budget = Budget.new(weekly_budget:10, user_id:1, monthly_budget:10, weekly_spending:1, monthly_spending:10)
  end
  
  test "budget should be valid" do
    assert @budget.valid?
  end
  
end
