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
