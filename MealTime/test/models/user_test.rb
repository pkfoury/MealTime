require 'test_helper'

# Followed a guide called Ruby on Rails Tutorial by Michael Hartl
# https://www.railstutorial.org/book/modeling_users

class UserTest < ActiveSupport::TestCase
    def setup
        @user = User.new(userName: "Example", email: "example@mail.com")
    end

    test "should be valid" do
        assert @user.valid?
    end

    test "Name should be present" do
        @user.userName = "    "
        assert_not @user.valid?
    end

    test "Email should be present" do
        @user.email = "    "
        assert_not @user.valid?
    end

    test "UserName too long" do
        @user.userName = "a" * 51
        assert_not @user.valid?
    end

    test "Email too long" do
        @user.email = "a" * 245 + "example.com"
        assert_not @user.valid?
    end

    test "Email address should be unique" do
        duplicate_user = @user.dup
        duplicate_user.email = @user.email.upcase
        @user.save
        assert_not duplicate_user.valid?
    end
end
