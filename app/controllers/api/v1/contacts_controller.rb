module Api
  module V1

    class ContactsController < ApiController

      def index
        @contacts = Contact.all
        render json: @contacts
      end

      def show
        render json: @contact
      end

      def create
        Contact::AsCSV.new(params[:csv_upload].tempfile).import
        @contacts = Contact.all
        render json: @contacts
      end

      def destroy
        if (params[:id] == '-1')
          @contacts = Contact.all
          @contacts.delete(@contacts.ids)
          render json: @contacts
        else
          @contact = Contact.find(params[:id])
          @contact.destroy
          head :no_content
        end
      end
    end
  end
end
