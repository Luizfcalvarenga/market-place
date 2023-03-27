class UploadBikePhotosJob < ApplicationJob
  queue_as :default

  def perform(bike, file_path_to_save_to)
    # Do something later
    photo = File.open(file_path_to_save_to)
    bike.photos.attach(photo)
  end
end
