class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    # kk
    # @me = current_user
    @private_chats = []
    @users = []
    @conversations = []
    @sera = []
    Chat.where(is_private: true).where("name ILIKE ?", "%_3%").each do | private_chat |

      @conversations << private_chat.participants.where.not(user_id: current_user.id).first

    end

    # @private_chats.each do | chat |
    #   @conversations << chat.participants.where.not(user_id: current_user.id).first
    # end
    # @users = @conversations.map do | conversation|
    #   User.find_by(id: conversation.user_id)
    # end

    # @users
    # @conversations.each do | conversation |

    #   @users << conversation

    # end
    # @users.each do | user |
    #   @users << User.find_by(id: user.user_id)
    # end
    # @users
    # # @users.each do |user |
    # #   @conversations << User.where(id: user.user_id).first
    # # end
    # @users
    # @users.each do | user |
    #   @convarsations << chat.participants.where.not(user_id: current_user.id).first
    # end
    # @me = @private_chats.where("name ILIKE ?", "%_#{current_user.id}%").all
    # @me = @private_chats.each do | chat |
    #   chat.name.include? "_#{current_user.id}"
    # end
    # SELECT user.id, chat.id
    # FROM participants
    # JOIN consultations ON doctors.id = consultations.doctor_id
    # JOIN patients ON consultations.patient_id = patients.id
    # WHERE doctors.first_name = 'Rosalind'
    # AND doctors.last_name = 'Franklin'
    # ORDER BY patients.last_name;

    # kk
    authorize @user
    @chat = Chat.new
    @chats = Chat.public_chats
    @chat_name = get_name(@user, current_user)
    @single_chat = Chat.where(name: @chat_name).first || Chat.create_private_chat([@user, current_user], @chat_name)

    @message = Message.new
    @messages = @single_chat.messages.order(created_at: :asc)
    render 'chats/index'
  end

  private

  def get_name(user1, user2)
    user = [user1, user2].sort
    "private_#{user[0].id}_#{user[1].id}"
  end
end
