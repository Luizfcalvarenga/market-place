class LikesController < ApplicationController

  def index
    @likes = policy_scope(Like).order(created_at: :desc)
    @user = current_user
  end

  def new
    if current_user.nil?
      flash[:notice] = "Você deve criar uma conta antes."
    end
    @like = Like.new
  end

  def create
    if current_user.nil?
      flash[:notice] = "Você deve criar uma conta antes."
    end

    if params[:like][:likeble_type] == "Bike"
      @likeble = Bike.find(params[:like][:likeble_id].to_i)
    elsif params[:like][:likeble_type] == "Product"
      @likeble = Product.find(params[:like][:likeble_id].to_i)
    end

    skip_authorization

    if Like.where(user_id: current_user.id, likeble: @likeble).present?
      render json: { success: false, errors: {like: "exists"} }
      return
    elsif @likeble.user == current_user
      render json: { success: false, errors: {user: "own_product"} }
      return
    elsif current_user.blank?
      render json: { success: false, errors: {user: "sign_in request"} }
      return
    end
    ActiveRecord::Base.transaction do
      @like = Like.create(
        user: current_user,
        likeble: @likeble,
      )
      @like.persisted?

    end

    if @like.save
      render json: { success: true, like: @like }
    else
      render json: { success: false, errors: {like: @like.errors, user: user_error} }
    end
  end

  def destroy
    @like = Like.find(params[:id])
    authorize @like

    @like.destroy
    redirect_to likes_path
    flash[:notice] = "Unliked"
  end

  private

  def like_params
    params.require(:like).permit(:user, :likeble)
  end

  def already_liked?
    Like.where(user_id: current_user.id, likeble_id: params[:likeble_id]).exists?
  end
end
