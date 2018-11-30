module Api
    module V1
        class AllergensController < ApplicationController
            skip_before_action :verify_authenticity_token
            skip_before_action :require_token
            def index
                allergen = Allergen.order("name asc")
                render json: {status: 'SUCCESS', message: 'Hit Allergen Endpoint', data: allergen}, status: :ok
            end

            def create
                allergen = Allergen.new(allergen_params)
                logger.debug "New Allergen: #{allergen.attributes.inspect}"
                logger.debug "Allergen should be valid: #{allergen.valid?}"
                if allergen.save
                    render json: {status: 'SUCCESS', message: 'Allergen created', data: allergen}, status: :ok
                else
                    logger.debug "#{allergen.errors.full_messages}"
                    render json: {status: 'ERROR', message: 'Allergen not created', data: allergen.errors.full_messages}, status: :unprocessable_entity

                end
            end

            def show
                allergen = Allergen.where(id: params["id"])
                render json: {status: 'SUCCESS', message: 'Allergen found', data: allergen }, status: :ok
            end

            private
            def allergen_params
                params.permit(:name, :id)
            end
        end
    end
end
