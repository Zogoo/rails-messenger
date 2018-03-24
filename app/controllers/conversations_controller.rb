class ConversationsController < ApplicationController
  def create
    @conversation = Conversation.get(current_user.id, params[:user_id])

    add_conversation unless coverstated?

    respond_to do |format|
      format.js
    end
  end

  def close
    @conversation = Conversation.find(params[:id])

    session[:conversations].delete(@conversation.id)

    respond_to do |format|
      format.js
    end
  end

  private

  def add_conversation
    session[:conversations] ||= []
    session[:conversations] << @conversation.id
  end

  def coverstated?
    session[:conversations].include?(@conversation.id)
  end
end
