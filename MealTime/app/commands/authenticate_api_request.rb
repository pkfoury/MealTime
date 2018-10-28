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
    @user ||= User.find_by_auth_digest(http_auth_header)
    puts @user
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= http_auth_header
  end

  def http_auth_header
    if headers['Token'].present?
      return headers['Token'].split(' ').last
    else
      errors.add :token, 'Missing token'
    end
    nil
  end
end