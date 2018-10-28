class AuthenticateApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    @user ||= User.find_by(user_name: params[:session][:user_name])
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= http_auth_header
  end

  def http_auth_header
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    else
      errors.add :token, 'Missing token'
    end
    nil
  end
end