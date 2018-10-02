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

ActiveRecord::Schema.define(version: 2018_10_02_203937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "allergens", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "budgets", force: :cascade do |t|
    t.decimal "weeklyBudget", default: "0.0", null: false
    t.decimal "weeklySpending", default: "0.0", null: false
    t.decimal "monthlyBudget", default: "0.0", null: false
    t.decimal "monthlySpending", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.text "name", null: false
    t.integer "calories", default: 0, null: false
    t.integer "totalFat", default: 0, null: false
    t.integer "transFat", default: 0, null: false
    t.integer "cholesterol", default: 0, null: false
    t.integer "sodium", default: 0, null: false
    t.integer "totalCarbs", default: 0, null: false
    t.integer "protein", default: 0, null: false
    t.decimal "servingSize", null: false
    t.decimal "dvTotalFat", default: "0.0", null: false
    t.decimal "dvTransFat", default: "0.0", null: false
    t.decimal "dvCholesterol", default: "0.0", null: false
    t.decimal "dvSodium", default: "0.0", null: false
    t.decimal "dvCarbs", default: "0.0", null: false
    t.decimal "dvProtein", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipes", force: :cascade do |t|
    t.text "recipeName", null: false
    t.text "instructions", null: false
    t.time "cookTime"
    t.text "creatorComments", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "restaurant_histories", force: :cascade do |t|
    t.date "dateVisited", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.text "name"
    t.text "weblink"
    t.text "yelpLink"
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
  end

  create_table "user_votes", force: :cascade do |t|
    t.boolean "vote", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "userName"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
