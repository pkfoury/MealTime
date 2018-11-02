# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# @meal_type1 = MealType.new(name: "Breakfast")
# @meal_type2 = MealType.new(name: "Lunch")
# @meal_type3 = MealType.new(name: "Dinner")
# @meal_type4 = MealType.new(name: "Snack")
# @meal_type1.save
# @meal_type2.save
# @meal_type3.save
# @meal_type4.save

# @allergen1 = Allergen.new(name: "gluten")
# @allergen2 = Allergen.new(name: "nuts")
# @allergen3 = Allergen.new(name: "lactose")
# @allergen1.save
# @allergen2.save
# @allergen3.save

# @meal1 = Meal.new(date_of_meal: "2018-9-10", total_calories: 200, user_id: 1, meal_type_id: 1)
# @meal2 = Meal.new(date_of_meal: "2018-10-30", total_calories: 5, user_id: 1, meal_type_id: 1)
# @meal3 = Meal.new(date_of_meal: "2018-10-31", total_calories: 1000, user_id: 1, meal_type_id: 1)
# @meal1.save
# @meal2.save
# @meal3.save

@meal_stuff = MealsIngredients.new(meal_id: 24, ingredient_id: 4, portion_count: 1)
@meal_stuff.save