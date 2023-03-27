class UploadBikePhotosJob < ApplicationJob
  queue_as :default

  def perform(@bike, photo)
    # Do something later
    @bike.photos.attach(photo)
  end
end
