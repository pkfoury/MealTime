require 'test_helper'

# Followed a guide called Ruby on Rails Tutorial by Michael Hartl
# https://www.railstutorial.org/book/modeling_users

class UserTest < ActiveSupport::TestCase
    def setup
        @user = User.new(user_name: "Example", email: "example@mail.com",
        password: "ur_mum", password_confirmation: "ur_mum")
    end

    test "should be valid" do
        assert @user.valid?
    end

    test "Name should be present" do
        @user.user_name = "    "
        assert_not @user.valid?
    end

    test "Email should be present" do
        @user.email = "    "
        assert_not @user.valid?
    end

    test "UserName too long" do
        @user.user_name = "a" * 51
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

    test "Username should be unique" do
        duplicate_user = @user.dup
        duplicate_user.user_name = @user.user_name.upcase
        @user.save
        assert_not duplicate_user.valid?
    end

    test "Emails should be saved in downcase" do
        mixed_case = "baR@FOo.cOM"
        @user.email = mixed_case
        @user.save
        assert_equal mixed_case.downcase, @user.reload.email
    end

    test "Password field should no be blank" do
        @user.password = @user.password_confirmation = " " * 6
        assert_not @user.valid?
    end

    test "Password has a minimum length" do
        @user.password = @user.password_confirmation = "a" * 5
        assert_not @user.valid?
    end
end
