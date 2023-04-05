class UploadBikePhotosJob < ApplicationJob
  queue_as :default

  def perform(bike, file_path_to_save_to, photo_name, photo_content_type)
    bike.photos.attach(io: File.open(File.join(file_path_to_save_to)), filename: photo_name, content_type: photo_content_type)
  end
end
