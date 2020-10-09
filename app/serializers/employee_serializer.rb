# frozen_string_literal: true

class EmployeeSerializer
  include FastJsonapi::ObjectSerializer

  attribute :age
  attribute :first_name
  attribute :last_name

  belongs_to :department
end
