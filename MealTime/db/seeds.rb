# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

# any of these values that you uncomment will be added to the DB regardless
# of if they were in it or not. Keep our DB clean, only uncomment seeds you 
# want to be added and comment out the rest

#-------------------------------------------------------------------------------

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

 @meal1 = Meal.new(date_of_meal: "2018-9-10", total_calories: 200, user_id: 18, meal_type_id: 1, total_fat: 1,
    total_trans_fat: 1, total_cholesterol: 1, total_sodium: 1, total_carbs:1, total_protein: 1)
 @meal1.save

# @ingredient = Ingredient.new(name: 'cheese', calories: 200, total_fat: 2, trans_fat: 12, 
#     cholesterol: 12, sodium: 12, total_carbs: 12, protein: 12, serving_size: 1,
#     dv_total_fat: 1, dv_trans_fat: 1, dv_cholesterol: 1, dv_sodium: 1, dv_carbs: 1,
#     dv_protein: 1)
# @ingredient.save
#  @allergen_ingredient = AllergensIngredient.new(allergen_id:78, ingredient_id: 19)
#  @allergen_ingredient.save
# @recipe = Recipe.new(recipe_name: 'bread', instructions: 'you know this', cook_time:'2:00',
#     creator_comments: '', user_id:5, public: false, total_calories: 1, total_fat: 1,
#     total_trans_fat: 1, total_cholesterol: 1, total_sodium: 1, total_carbs:1, total_protein: 1,
#     difficulty: 1)
#     @recipe.save
# @recipe_ingredient = IngredientsRecipe.new(ingredient_id: 19, recipe_id: 28, amount: 1, uom_id:2)
# @recipe_ingredient.save
# @recipe_ingredient2 = IngredientsRecipe.new(ingredient_id: 19, recipe_id: 21, amount: 1, uom_id:2)
# @recipe_ingredient2.save
# @recipe_ingredient3 = IngredientsRecipe.new(ingredient_id: 19, recipe_id: 26, amount: 1, uom_id:2)
# @recipe_ingredient3.save
# @recipe_ingredient4 = IngredientsRecipe.new(ingredient_id: 19, recipe_id: 20, amount: 1, uom_id:2)
# @recipe_ingredient4.save