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

ActiveRecord::Schema.define(version: 2018_11_02_052321) do

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

  create_table "ingredients", force: :cascade do |t|
    t.text "name", null: false
    t.integer "calories", default: 0, null: false
    t.integer "total_fat", default: 0, null: false
    t.integer "trans_fat", default: 0, null: false
    t.integer "cholesterol", default: 0, null: false
    t.integer "sodium", default: 0, null: false
    t.integer "total_carbs", default: 0, null: false
    t.integer "protein", default: 0, null: false
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
    t.index ["meal_id"], name: "index_meals_users_on_meal_id"
    t.index ["user_id"], name: "index_meals_users_on_user_id"
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
    t.integer "total_calories"
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "restaurant_histories", force: :cascade do |t|
    t.date "date_visited", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "restaurant_id"
    t.index ["restaurant_id"], name: "index_restaurant_histories_on_restaurant_id"
    t.index ["user_id"], name: "index_restaurant_histories_on_user_id"
  end

  create_table "restaurant_preferences", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "restaurant_id"
    t.boolean "dislike", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_restaurant_preferences_on_restaurant_id"
    t.index ["user_id"], name: "index_restaurant_preferences_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.text "name"
    t.text "web_link"
    t.text "yelp_ink"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "uoms", force: :cascade do |t|
    t.text "name"
    t.string "code"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.boolean "track_macro"
    t.boolean "first_time"
    t.string "image_url"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

  add_foreign_key "budgets", "users", on_delete: :cascade
  add_foreign_key "ingredients_recipes", "uoms"
  add_foreign_key "meals", "meal_types", on_delete: :nullify
  add_foreign_key "meals", "users", on_delete: :cascade
  add_foreign_key "recipes", "users", on_delete: :nullify
  add_foreign_key "restaurant_histories", "restaurants", on_delete: :cascade
  add_foreign_key "restaurant_histories", "users", on_delete: :cascade
  add_foreign_key "restaurant_preferences", "restaurants", on_delete: :cascade
  add_foreign_key "restaurant_preferences", "users", on_delete: :cascade
  add_foreign_key "user_locations", "users", on_delete: :cascade
  add_foreign_key "user_votes", "recipes", on_delete: :cascade
  add_foreign_key "user_votes", "users", on_delete: :cascade
end
