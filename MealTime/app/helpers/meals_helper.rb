module MealsHelper
    def processMeal(mealData, daily_entry)
        current_meal = Meal.new()

        mealData.each do |item|
            puts "Protein before #{daily_entry.protein}"
            nutrients = item['nutrients']
            calories = nutrients[0]['value']
            protein = nutrients[1]['value']
            fat = nutrients[2]['value']
            carbs = nutrients[3]['value']

            daily_entry.calories += calories.to_i
            daily_entry.protein += protein.to_i
            daily_entry.fat += fat.to_i
            daily_entry.carbs += carbs.to_i

            puts "Protein after #{daily_entry.protein}"
            
        end
        if daily_entry.save
            puts "Daily nutrients saved"
        end
    end
end