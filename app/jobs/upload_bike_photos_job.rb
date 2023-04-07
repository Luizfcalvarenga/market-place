class UploadBikePhotosJob < ApplicationJob
  queue_as :default

  def perform(bike, image_data_uri)
    photo_decode = Base64.decode64(image_data_uri)
    image_blob = ActiveStorage::Blob.create_after_upload!(
      io: StringIO.new(photo_decode),
      filename: "image.jpg",
      content_type: "image/jpeg"
    )
    bike.photos.attach(image_blob)
  end
end
