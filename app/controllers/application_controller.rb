class ApplicationController < ActionController::Base
  before_action :authenitcate_user!
  protect_from_forgery with: :exception
end
