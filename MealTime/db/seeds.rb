# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
@meal_type1 = MealType.new(name: "Breakfast")
@meal_type2 = MealType.new(name: "Lunch")
@meal_type3 = MealType.new(name: "Dinner")
@meal_type4 = MealType.new(name: "Snack")
@meal_type1.save
@meal_type2.save
@meal_type3.save
@meal_type4.save

@allergen1 = Allergen.new(name: "gluten")
@allergen2 = Allergen.new(name: "nuts")
@allergen3 = Allergen.new(name: "lactose")
@allergen1.save
@allergen2.save
@allergen3.save

@meal1 = Meal.new(date_of_meal: "2018-9-10", total_calories: 200, user_id: 1, meal_type_id: 1)
@meal1.save

@meal2 = Meal.new(date_of_meal:"2018-11-2",total_calories: 300, user_id:1, meal_type_id: 1)
@meal2.save

@meal3 = Meal.new(date_of_meal:"2018-11-1",total_calories:400,user_id:1,meal_type_id:1)
@meal3.save

@ingredients1 = Ingredient.new(name:"potato",calories: 1000,sodium:2,total_carbs:2,protein:50,serving_size:2.0,total_fat:15)
@ingredients1.save