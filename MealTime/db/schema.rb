# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_30_065547) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "allergens", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "allergens_ingredients", force: :cascade do |t|
    t.bigint "allergen_id", null: false
    t.bigint "ingredient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["allergen_id"], name: "index_allergens_ingredients_on_allergen_id"
    t.index ["ingredient_id"], name: "index_allergens_ingredients_on_ingredient_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.decimal "weekly_budget", default: "0.0", null: false
    t.decimal "weekly_spending", default: "0.0", null: false
    t.decimal "monthly_budget", default: "0.0", null: false
    t.decimal "monthly_spending", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "daily_nutrients", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "calories", default: 0, null: false
    t.decimal "protein", default: "0.0", null: false
    t.decimal "fat", default: "0.0", null: false
    t.decimal "carbs", default: "0.0", null: false
    t.decimal "budget", precision: 8, scale: 2, default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "trans_fat"
    t.boolean "cheat_day_flag", default: false
    t.string "day", null: false
    t.index ["user_id", "day"], name: "index_daily_nutrients_on_user_id_and_day", unique: true
    t.index ["user_id"], name: "index_daily_nutrients_on_user_id"
  end

  create_table "ingredients", force: :cascade do |t|
    t.text "name", null: false
    t.integer "calories", default: 0, null: false
    t.decimal "total_fat", default: "0.0", null: false
    t.decimal "trans_fat", default: "0.0", null: false
    t.integer "cholesterol", default: 0, null: false
    t.integer "sodium", default: 0, null: false
    t.decimal "total_carbs", default: "0.0", null: false
    t.decimal "protein", default: "0.0", null: false
    t.decimal "serving_size", null: false
    t.decimal "dv_total_fat", default: "0.0", null: false
    t.decimal "dv_trans_fat", default: "0.0", null: false
    t.decimal "dv_cholesterol", default: "0.0", null: false
    t.decimal "dv_sodium", default: "0.0", null: false
    t.decimal "dv_carbs", default: "0.0", null: false
    t.decimal "dv_protein", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients_recipes", force: :cascade do |t|
    t.bigint "ingredient_id", null: false
    t.bigint "recipe_id", null: false
    t.decimal "amount"
    t.bigint "uom_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_ingredients_recipes_on_ingredient_id"
    t.index ["recipe_id"], name: "index_ingredients_recipes_on_recipe_id"
    t.index ["uom_id"], name: "index_ingredients_recipes_on_uom_id"
  end

  create_table "meal_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meals", force: :cascade do |t|
    t.date "date_of_meal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "meal_type_id"
    t.integer "total_calories", default: 0
    t.decimal "total_fat"
    t.decimal "total_trans_fat"
    t.integer "total_cholesterol"
    t.integer "total_sodium"
    t.decimal "total_carbs"
    t.decimal "total_protein"
    t.index ["meal_type_id"], name: "index_meals_on_meal_type_id"
    t.index ["user_id"], name: "index_meals_on_user_id"
  end

  create_table "meals_ingredients", force: :cascade do |t|
    t.bigint "meal_id", null: false
    t.bigint "ingredient_id", null: false
    t.decimal "portion_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ingredient_id"], name: "index_meals_ingredients_on_ingredient_id"
    t.index ["meal_id"], name: "index_meals_ingredients_on_meal_id"
  end

  create_table "meals_recipes", force: :cascade do |t|
    t.bigint "meal_id", null: false
    t.bigint "recipe_id", null: false
    t.decimal "portion_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_meals_recipes_on_meal_id"
    t.index ["recipe_id"], name: "index_meals_recipes_on_recipe_id"
  end

  create_table "meals_users", force: :cascade do |t|
    t.bigint "meal_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_meals_users_on_meal_id"
    t.index ["user_id"], name: "index_meals_users_on_user_id"
  end

  create_table "recipe_preferences", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "recipe_id"
    t.index ["recipe_id"], name: "index_recipe_preferences_on_recipe_id"
    t.index ["user_id"], name: "index_recipe_preferences_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.text "recipe_name", null: false
    t.text "instructions", null: false
    t.string "cook_time"
    t.text "creator_comments", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.boolean "public", default: false
    t.integer "total_calories", default: 1
    t.decimal "total_fat", default: "1.0"
    t.decimal "total_trans_fat", default: "1.0"
    t.integer "total_cholesterol", default: 1
    t.integer "total_sodium", default: 1
    t.decimal "total_carbs", default: "1.0"
    t.decimal "total_protein", default: "1.0"
    t.integer "difficulty"
    t.integer "num_ingredients"
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "restaurant_dislikes", force: :cascade do |t|
    t.string "yelp_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_restaurant_dislikes_on_user_id"
  end

  create_table "restaurant_histories", force: :cascade do |t|
    t.date "date_visited", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "yelp_id", null: false
    t.index ["user_id"], name: "index_restaurant_histories_on_user_id"
  end

  create_table "restaurant_preferences", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "yelp_id", null: false
    t.index ["user_id"], name: "index_restaurant_preferences_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.text "name"
    t.text "web_link"
    t.text "yelp_ink"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "rating"
  end

  create_table "uoms", force: :cascade do |t|
    t.text "name"
    t.string "code"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_allergens", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "allergen_id"
    t.index ["allergen_id"], name: "index_user_allergens_on_allergen_id"
    t.index ["user_id"], name: "index_user_allergens_on_user_id"
  end

  create_table "user_goals", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "calories", null: false
    t.integer "fat", default: -1, null: false
    t.integer "carbs", default: -1, null: false
    t.integer "protein", default: -1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "weight", null: false
    t.decimal "money", precision: 8, scale: 2, null: false
    t.boolean "track_macros", default: false
    t.integer "cheat_day_calories", default: 0, null: false
    t.index ["user_id"], name: "index_user_goals_on_user_id"
  end

  create_table "user_locations", force: :cascade do |t|
    t.decimal "latitude"
    t.decimal "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_user_locations_on_user_id"
  end

  create_table "user_votes", force: :cascade do |t|
    t.boolean "vote", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "recipe_id"
    t.bigint "user_id"
    t.index ["recipe_id"], name: "index_user_votes_on_recipe_id"
    t.index ["user_id"], name: "index_user_votes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "auth_digest"
    t.boolean "first_time"
    t.string "image_url"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

  add_foreign_key "budgets", "users", on_delete: :cascade
  add_foreign_key "ingredients_recipes", "uoms"
  add_foreign_key "meals", "meal_types", on_delete: :nullify
  add_foreign_key "meals", "users", on_delete: :cascade
  add_foreign_key "recipe_preferences", "recipes"
  add_foreign_key "recipe_preferences", "users"
  add_foreign_key "recipes", "users", on_delete: :nullify
  add_foreign_key "restaurant_histories", "users", on_delete: :cascade
  add_foreign_key "restaurant_preferences", "users", on_delete: :cascade
  add_foreign_key "user_allergens", "recipes", column: "allergen_id"
  add_foreign_key "user_allergens", "users"
  add_foreign_key "user_locations", "users", on_delete: :cascade
  add_foreign_key "user_votes", "recipes", on_delete: :cascade
  add_foreign_key "user_votes", "users", on_delete: :cascade
end
