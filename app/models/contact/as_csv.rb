# == Schema Information
#
# Table name: contacts
#
#  id            :integer          not null, primary key
#  first_name    :string
#  last_name     :string
#  email_address :string
#  phone_number  :string
#  company_name  :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  extension     :string

require 'csv'

class Contact

  class AsCSV
    attr_reader :csv

    def initialize(file, _opts = {})
      @csv = CSV.read(file, headers: false)
    end

    def import

      @csv.tap(&:shift).each do |row|

        Contact.transaction do
          Contact.find_or_create_by(email_address: row[2]) do |contact|
            contact.first_name = row[0]
            contact.last_name = row[1]
            contact.phone_number = row[3]
            contact.company_name = row[4]
          end
        end
      end
    end
  end
end
