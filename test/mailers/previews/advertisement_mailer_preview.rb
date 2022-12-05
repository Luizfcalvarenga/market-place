# Preview all emails at http://localhost:3000/rails/mailers/advertisement_mailer
class AdvertisementMailerPreview < ActionMailer::Preview

  def advertisement_creation
    advertisement = Advertisement.last

    AdvertisementMailer.with(advertisement: advertisement).advertisement_creation
  end

end
