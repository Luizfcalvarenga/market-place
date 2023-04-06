class UploadBikePhotosJob < ApplicationJob
  queue_as :default

  def perform(bike_id, image_data_uri)
    cloudinary_url = Cloudinary::Uploader.upload("data:image/png;base64,#{photo}")["secure_url"]
    bike = Bike.find(bike_id)
    bike.image_url = cloudinary_url
    bike.save
    # bike.photos.attach(io: File.open(File.join(file_path_to_save_to)), filename: photo_name, content_type: photo_content_type)


    # image_blob = ActiveStorage::Blob.create_after_upload!(
    #   io: StringIO.new(Base64.decode64(image_data_uri['data:image/jpg;base64,'.length .. -1])),
    #   filename: "image.jpg",
    #   content_type: "image/jpeg"
    # )

    # image_data = Base64.decode64(image_data_uri['data:image/png;base64,'.length .. -1])
    # image_file = Tempfile.new('image_file')
    # image_file.binmode
    # image_file.write image_data
    # image_file.rewind
    bike.photos.attach(image_blob)



  end
end
