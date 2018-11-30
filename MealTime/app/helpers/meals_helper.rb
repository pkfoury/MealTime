module MealsHelper
    def processEntry(foodData, daily_entry, money)

        # foodData is the list of all of the meals being sent
        # Item is each meal
        # Item[1]["mealData"] is the individual foods

        foodData.each do |item|
            foods = item[1]["mealData"]
            name = foods[0]

            if name == nil
                next
            else
                processMeal(foods, daily_entry)
            end     
            
        end

        daily_entry.budget += money.to_f

        if daily_entry.save
            puts "Daily Entry Saved"
        end
    end

    def processMeal(meal, daily_entry)

        meal.each do |food|
            nutrients = food['nutrients']

            calories = nutrients[0]['value']
            protein = nutrients[1]['value']
            fat = nutrients[2]['value']
            carbs = nutrients[3]['value']

            daily_entry.calories += calories.to_i
            daily_entry.protein += protein.to_f
            daily_entry.fat += fat.to_f
            daily_entry.carbs += carbs.to_f
        end

        if daily_entry.save
            puts "Daily nutrients saved"
        end

    end
end