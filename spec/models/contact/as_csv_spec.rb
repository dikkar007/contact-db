require 'rails_helper'

RSpec.describe Contact::AsCSV, type: :model_service do
  subject(:contact_with_csv) do
    # not the ideal place, but, It'll do for now.
    csv = "#{Rails.root}/spec/models/contact/test_csv.csv"
    described_class.new(csv)
  end

  let(:first_attributes) do
    {
      first_name: 'Gerhard', last_name: 'Kautzer',
      email_address: 'gerhardkautzer@cronabayer.com',
      phone_number: '2076431816', company_name: 'Hodkiewicz-Lynch',
      extension: nil
    }
  end

  let(:second_attributes) do
    {
      first_name: 'Myra', last_name: 'Crona',
      email_address: 'myracrona@schinner.info',
      phone_number: '7241969470', company_name: 'Champlin-Hahn',
      extension: '998'
    }
  end

  describe '.import' do
    it 'imported the first record without importing the header' do
      contact_with_csv.import
      expect(Contact.first).to have_attributes(first_attributes)
    end

    it 'imported the second record without importing the header' do
      contact_with_csv.import
      expect(Contact.second).to have_attributes(second_attributes)
    end
  end
end
