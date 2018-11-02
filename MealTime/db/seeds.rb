# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
@recipe = Recipe.new(recipe_name: "Yum Yum sauce", instructions: "google it", cook_time: "2:00", creator_comments: "enjoy!", user_id: 980190962 )
@recipe.save