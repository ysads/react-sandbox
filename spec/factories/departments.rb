# frozen_string_literal: true

FactoryBot.define do
  factory :department do
    code { Faker::Code.asin }
    name { Faker::Company.industry }
  end
end
