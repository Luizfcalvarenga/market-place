# Preview all emails at http://localhost:3000/rails/mailers/advertisement_mailer
class AdvertisementMailerPreview < ActionMailer::Preview

  def advertisement_creation
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_creation
  end

  def notify_admin_advertisement_creation
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).notify_admin_advertisement_creation
  end

  def advertisement_approval
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_approval
  end

  def advertisement_rejecter
    advertisement = Advertisement.first
    attrs_rejected = ["reject locality",  "reject year", "reject model"]
    values_to_review = ["Rio de Janeiro", "2001", "gTX"]
    comments = "Revisar os campos acima para publicar anúncio"
    AdvertisementMailer.with(advertisement: advertisement, attrs_rejected: attrs_rejected, values_to_review: values_to_review, comments: comments).advertisement_rejecter
  end

  def advertisement_updater
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_updater
  end

  def advertisement_paid
    advertisement = Advertisement.last
    AdvertisementMailer.with(advertisement: advertisement).advertisement_paid
  end

end
