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

ActiveRecord::Schema.define(version: 2018_10_05_031446) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "allergens", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "allergens_ingredients", id: false, force: :cascade do |t|
    t.bigint "ingredient_id", null: false
    t.bigint "allergen_id", null: false
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
    t.decimal "dvTotal_fat", default: "0.0", null: false
    t.decimal "dvTrans_fat", default: "0.0", null: false
    t.decimal "dv_cholesterol", default: "0.0", null: false
    t.decimal "dv_sodium", default: "0.0", null: false
    t.decimal "dv_sarbs", default: "0.0", null: false
    t.decimal "dv_protein", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "ingredients_id"
  end

  create_table "meal_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meals", force: :cascade do |t|
    t.date "dateOfMeal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "recipe_id"
    t.bigint "meal_type_id"
    t.index ["meal_type_id"], name: "index_meals_on_meal_type_id"
    t.index ["recipe_id"], name: "index_meals_on_recipe_id"
    t.index ["user_id"], name: "index_meals_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.text "recipe_name", null: false
    t.text "instructions", null: false
    t.string "cook_time"
    t.text "creator_comments", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
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
    t.index ["recipe_id"], name: "index_user_votes_on_recipe_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

  add_foreign_key "budgets", "users"
  add_foreign_key "meals", "meal_types"
  add_foreign_key "meals", "recipes"
  add_foreign_key "meals", "users"
  add_foreign_key "recipes", "users"
  add_foreign_key "restaurant_histories", "restaurants"
  add_foreign_key "restaurant_histories", "users"
  add_foreign_key "user_locations", "users"
  add_foreign_key "user_votes", "recipes"
end
