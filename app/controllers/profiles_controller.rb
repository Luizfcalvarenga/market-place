class ProfilesController < ApplicationController
  skip_after_action :verify_authorized, only: [ :edit, :update]

  def edit
    @profile = current_user
  end

  def update
    @profile = current_user
    if @profile.update(profile_params)
      flash[:notice] = "Informações atualizadas com sucesso"

      redirect_to edit_profiles_path
    else
      flash[:alert] = "Ocorreu algum erro ao atualizar seus dados. Insira o nome completo, CPF, telefone e CEP válidos"
      redirect_to root_path and return
    end
  end

  private

  def profile_params
    params.require(:user).permit(:full_name, :photo, :document_number, :cep, :phone_number, :address)
  end
end
