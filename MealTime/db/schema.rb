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

ActiveRecord::Schema.define(version: 2018_09_30_205011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "budgets", force: :cascade do |t|
    t.bigint "user_id"
    t.decimal "weeklyBudget", default: "0.0", null: false
    t.decimal "weeklySpending", default: "0.0", null: false
    t.decimal "monthlyBudget", default: "0.0", null: false
    t.decimal "monthlySpending", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.text "recipeName", null: false
    t.text "instructions", null: false
    t.time "cookTime"
    t.text "creatorComments", default: "", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "user_votes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "recipe_id"
    t.boolean "vote", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_user_votes_on_recipe_id"
    t.index ["user_id"], name: "index_user_votes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "userName"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "budgets", "users"
  add_foreign_key "recipes", "users"
  add_foreign_key "user_votes", "recipes"
  add_foreign_key "user_votes", "users"
end
