class UploadProductPhotosJob < ApplicationJob
  queue_as :default

  def perform(product, file_path_to_save_to, photo_name, photo_content_type)
    product.photos.attach(io: File.open(File.join(file_path_to_save_to)), filename: photo_name, content_type: photo_content_type)
  end
end
