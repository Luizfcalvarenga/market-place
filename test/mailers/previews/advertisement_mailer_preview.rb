# Preview all emails at http://localhost:3000/rails/mailers/advertisement_mailer
class AdvertisementMailerPreview < ActionMailer::Preview

  def advertisement_creation
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_creation
  end

  def advertisement_approval
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_approval
  end

  def advertisement_rejecter
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_rejecter
  end

end
