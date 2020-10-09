# frozen_string_literal: true

FactoryBot.define do
  factory :employee do
    age { Faker::Number.number(digits: 2) }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    department
  end
end
