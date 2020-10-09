# frozen_string_literal: true

class DepartmentSerializer
  include FastJsonapi::ObjectSerializer

  attribute :code
  attribute :name
end
