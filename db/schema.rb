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

ActiveRecord::Schema.define(version: 2022_11_29_191423) do

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

  create_table "advertisements", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "advertisable_type", null: false
    t.bigint "advertisable_id", null: false
    t.integer "invoice_id"
    t.string "invoice_url"
    t.string "invoice_pdf"
    t.integer "net_value"
    t.integer "price_in_cents"
    t.integer "value"
    t.datetime "invoice_paid_at"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "invoice_status"
    t.index ["advertisable_type", "advertisable_id"], name: "index_advertisements_on_advertisable"
    t.index ["user_id"], name: "index_advertisements_on_user_id"
  end

  create_table "bikes", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.bigint "service_id"
    t.string "modality"
    t.string "bike_type"
    t.integer "price_in_cents"
    t.integer "quantity"
    t.string "locality"
    t.string "frame_brand"
    t.string "model"
    t.string "year"
    t.string "frame_size"
    t.string "frame_material"
    t.string "front_rim_model"
    t.integer "number_of_front_gears"
    t.integer "number_of_rear_gears"
    t.string "brake_type"
    t.string "suspension_type"
    t.string "front_suspension_travel"
    t.string "rear_suspension_travel"
    t.string "seat_post_type"
    t.string "seat_post_travel"
    t.float "weight"
    t.string "bike_condition"
    t.string "structural_visual_condition"
    t.string "operating_condition"
    t.string "documentation_type"
    t.string "accessories"
    t.string "battery"
    t.text "description"
    t.datetime "removed_at"
    t.string "front_suspension_model"
    t.string "rear_suspension_model"
    t.string "front_derailleur_model"
    t.string "rear_derailleur_model"
    t.string "crankset"
    t.string "chain"
    t.string "brake_model"
    t.string "rear_rim_model"
    t.string "front_hub"
    t.string "rear_hub"
    t.string "front_tyre"
    t.string "rear_tyre"
    t.string "handlebar"
    t.string "stem"
    t.string "motor"
    t.integer "battery_cycles"
    t.integer "mileage"
    t.string "brake_disc_size"
    t.string "rim_size"
    t.text "accessories_description"
    t.string "pedals"
    t.string "seat_post_model"
    t.index ["category_id"], name: "index_bikes_on_category_id"
    t.index ["service_id"], name: "index_bikes_on_service_id"
    t.index ["user_id"], name: "index_bikes_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.string "modalities", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "chats", force: :cascade do |t|
    t.bigint "bike_id"
    t.bigint "product_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.boolean "is_private", default: false
    t.datetime "last_message_at"
    t.index ["bike_id"], name: "index_chats_on_bike_id"
    t.index ["product_id"], name: "index_chats_on_product_id"
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

  create_table "notifications", force: :cascade do |t|
    t.string "recipient_type", null: false
    t.bigint "recipient_id", null: false
    t.string "type", null: false
    t.jsonb "params"
    t.datetime "read_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["read_at"], name: "index_notifications_on_read_at"
    t.index ["recipient_type", "recipient_id"], name: "index_notifications_on_recipient"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "bike_id"
    t.bigint "product_id"
    t.bigint "service_id"
    t.bigint "order_id"
    t.integer "quantity"
    t.integer "price_in_cents"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "removed_at"
    t.index ["bike_id"], name: "index_order_items_on_bike_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
    t.index ["service_id"], name: "index_order_items_on_service_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "invoice_id"
    t.string "invoice_url"
    t.string "invoice_pdf"
    t.integer "net_value"
    t.integer "value"
    t.integer "price_in_cents"
    t.datetime "invoice_paid_at"
    t.string "status"
    t.string "tracker_code"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "invoice_status"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "participants", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "chat_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chat_id"], name: "index_participants_on_chat_id"
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "product_attributes", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "product_type_attribute_id", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_product_attributes_on_product_id"
    t.index ["product_type_attribute_id"], name: "index_product_attributes_on_product_type_attribute_id"
  end

  create_table "product_type_attributes", force: :cascade do |t|
    t.bigint "product_type_id", null: false
    t.string "name"
    t.string "kind"
    t.string "options", default: [], array: true
    t.string "prompt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_type_id"], name: "index_product_type_attributes_on_product_type_id"
  end

  create_table "product_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "products", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "category_id"
    t.bigint "product_type_id", null: false
    t.string "modality"
    t.string "name"
    t.text "description"
    t.integer "price_in_cents"
    t.integer "quantity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "brand"
    t.datetime "removed_at"
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["product_type_id"], name: "index_products_on_product_type_id"
    t.index ["user_id"], name: "index_products_on_user_id"
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
    t.string "full_name"
    t.string "document_number"
    t.string "address"
    t.string "cep"
    t.string "phone_number"
    t.integer "status", default: 0
    t.integer "current_chat"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "advertisements", "users"
  add_foreign_key "bikes", "categories"
  add_foreign_key "bikes", "services"
  add_foreign_key "bikes", "users"
  add_foreign_key "chats", "bikes"
  add_foreign_key "chats", "products"
  add_foreign_key "messages", "chats"
  add_foreign_key "messages", "users"
  add_foreign_key "order_items", "bikes"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "order_items", "services"
  add_foreign_key "orders", "users"
  add_foreign_key "participants", "chats"
  add_foreign_key "participants", "users"
  add_foreign_key "product_attributes", "product_type_attributes"
  add_foreign_key "product_attributes", "products"
  add_foreign_key "product_type_attributes", "product_types"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "product_types"
  add_foreign_key "products", "users"
end
