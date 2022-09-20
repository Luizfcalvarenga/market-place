# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_19_222302) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "bikes", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.bigint "service_id"
    t.string "modality"
    t.integer "price_in_cents"
    t.integer "quantity"
    t.string "locality"
    t.string "frame_brand"
    t.string "model"
    t.string "year"
    t.string "frame_size"
    t.string "frame_material"
    t.string "rim_size"
    t.integer "number_of_front_gears"
    t.integer "number_of_rear_gears"
    t.string "brake_type"
    t.string "suspension_type"
    t.string "front_suspension_travel"
    t.string "rear_suspension_travel"
    t.string "seat_post_type"
    t.string "seat_post_travel"
    t.float "weight"
    t.string "bike_conditions"
    t.string "structural_visual_condition"
    t.string "opareting_condition"
    t.string "documentation_type"
    t.boolean "accessories"
    t.string "battery"
    t.text "description"
    t.index ["category_id"], name: "index_bikes_on_category_id"
    t.index ["service_id"], name: "index_bikes_on_service_id"
    t.index ["user_id"], name: "index_bikes_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "modalities"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "chats", force: :cascade do |t|
    t.bigint "bike_id"
    t.bigint "seller_id_id", null: false
    t.bigint "buyer_id_id", null: false
    t.bigint "component_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bike_id"], name: "index_chats_on_bike_id"
    t.index ["buyer_id_id"], name: "index_chats_on_buyer_id_id"
    t.index ["component_id"], name: "index_chats_on_component_id"
    t.index ["seller_id_id"], name: "index_chats_on_seller_id_id"
  end

  create_table "component_attributes", force: :cascade do |t|
    t.bigint "component_id", null: false
    t.bigint "component_type_attribute_id", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["component_id"], name: "index_component_attributes_on_component_id"
    t.index ["component_type_attribute_id"], name: "index_component_attributes_on_component_type_attribute_id"
  end

  create_table "component_type_attributes", force: :cascade do |t|
    t.bigint "component_type_id", null: false
    t.string "name"
    t.string "kind"
    t.string "options"
    t.string "prompt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["component_type_id"], name: "index_component_type_attributes_on_component_type_id"
  end

  create_table "component_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "components", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "category_id"
    t.bigint "component_type_id", null: false
    t.string "modality"
    t.string "name"
    t.text "description"
    t.integer "price_in_cents"
    t.integer "quantity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_components_on_category_id"
    t.index ["component_type_id"], name: "index_components_on_component_type_id"
    t.index ["user_id"], name: "index_components_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "chat_id", null: false
    t.text "content"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_messages_on_chat_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "bike_id"
    t.bigint "component_id"
    t.bigint "service_id"
    t.integer "quantity"
    t.integer "price_in_cents"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bike_id"], name: "index_order_items_on_bike_id"
    t.index ["component_id"], name: "index_order_items_on_component_id"
    t.index ["service_id"], name: "index_order_items_on_service_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "price_in_cents"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.boolean "allow_password_change", default: false
    t.json "tokens"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bikes", "categories"
  add_foreign_key "bikes", "services"
  add_foreign_key "bikes", "users"
  add_foreign_key "chats", "bikes"
  add_foreign_key "chats", "components"
  add_foreign_key "chats", "users", column: "buyer_id_id"
  add_foreign_key "chats", "users", column: "seller_id_id"
  add_foreign_key "component_attributes", "component_type_attributes"
  add_foreign_key "component_attributes", "components"
  add_foreign_key "component_type_attributes", "component_types"
  add_foreign_key "components", "categories"
  add_foreign_key "components", "component_types"
  add_foreign_key "components", "users"
  add_foreign_key "messages", "chats"
  add_foreign_key "messages", "users"
  add_foreign_key "order_items", "bikes"
  add_foreign_key "order_items", "components"
  add_foreign_key "order_items", "services"
end
