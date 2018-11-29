module DailyNutrientsHelper

    def check_today(user)
        today = Time.now.strftime("%m/%d/%y")
        current_user_id = user.id

        if DailyNutrient[current_user_id][Time.now] == nil
            puts "It's not there"
        end

        # if DailyNutrient[current_user_id][today] == nil
        #     false
        # else
        #     true
        # end
    end

end