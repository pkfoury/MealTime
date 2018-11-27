module Api
  module V1
      class AwsController < ApplicationController

        def index

        s3 = Aws::S3::Resource.new(
          region: 'us-west-1',
          access_key_id: ENV['AWS_ACCESS_KEY'],
          secret_access_key: ENV['AWS_SECRET']
        )

        obj = s3.bucket('mealtime-profiles').object(@current_user.id.to_s)
        
        url = URI.parse(obj.presigned_url(:put))

        # save image url here
        image_url = 'https://s3-us-west-1.amazonaws.com/mealtime-profiles/' + @current_user.id.to_s
        @current_user.update_attribute(:image_url, image_url)

        render json: url, status: :ok
      end
    end
  end
end