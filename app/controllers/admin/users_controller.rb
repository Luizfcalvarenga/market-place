module Admin
  class UsersController < ApplicationController
    def index
      @users = User.order(created_at: :desc)
    end

    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params.merge(password: "Nfnv2089"))

      if @user.save
        flash[:notice] = "Usuário #{@user.email} criado com sucesso"
      else
        render :new and return
      end

      redirect_to admin_users_path
    end

    private

    def user_params
      params.require(:user).permit(:email, :name, :document_number, :cep, :access, :phone_number)
    end
  end
end
