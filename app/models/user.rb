class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

	include DeviseTokenAuth::Concerns::User


  scope :all_except, ->(user) {where.not(id: user)}
  after_create_commit { broadcast_append_to "users" }
  after_update_commit { broadcast_update }

  has_many :advertisements
  has_many :orders
  has_many :messages
  has_many :participants
  has_many :chats, through: :participants
  has_many :notifications, dependent: :destroy, as: :recipient

  has_one_attached :photo

  # validates :cep, :document_number, :phone_number,  presence: true
  enum status: %i[offline away online]

  enum access: {
    user: "user",
    admin: "admin",
  }


  after_commit :add_default_photo, on: %i[create update]

  def broadcast_update
    broadcast_replace_to 'user_status', partial: 'users/status', user: self
  end

  def status_to_css
    case status
    when 'online'
      'bg-success'
    when 'away'
      'bg-warning'
    when 'offline'
      'bg-danger'
    else
      'bg-dark'
    end
  end


	def admin?
		true
	end

  def cpf_must_be_valid
    if !cpf_valid?(document_number)
      errors.add(:document_number, "inválido")
    end
  end

  def cep_must_be_valid
    if cep.gsub(/[^0-9]/, '').length != 8
      errors.add(:cep, "deve ter 8 digitos numéricos")
    end
  end

  def cpf_valid?(cpf)
    return false if cpf.nil?

    nulos = %w{12345678909 11111111111 22222222222 33333333333 44444444444 55555555555 66666666666 77777777777 88888888888 99999999999 00000000000 12345678909}
    valor = cpf.scan /[0-9]/
    if valor.length == 11
      unless nulos.member?(valor.join)
        valor = valor.collect{|x| x.to_i}
        soma = 10*valor[0]+9*valor[1]+8*valor[2]+7*valor[3]+6*valor[4]+5*valor[5]+4*valor[6]+3*valor[7]+2*valor[8]
        soma = soma - (11 * (soma/11))
        resultado1 = (soma == 0 or soma == 1) ? 0 : 11 - soma
        if resultado1 == valor[9]
          soma = valor[0]*11+valor[1]*10+valor[2]*9+valor[3]*8+valor[4]*7+valor[5]*6+valor[6]*5+valor[7]*4+valor[8]*3+valor[9]*2
          soma = soma - (11 * (soma/11))
          resultado2 = (soma == 0 or soma == 1) ? 0 : 11 - soma
          return true if resultado2 == valor[10]
        end
      end
    end
    return false
  end

  def add_default_photo
    return if photo.attached?

    photo.attach(
      io: File.open(Rails.root.join('app', 'assets', 'images', 'avatar-bike.png')),
      filename: 'avatar-bike.png',
      content_type: 'image/png'
    )
  end
  private

end
