# frozen_string_literal: true

require 'rails_helper'

describe DepartmentSerializer do
  it 'serializes object using json api' do
    department = create(:department)

    result = described_class.new(department).serializable_hash

    expect(result).to eq(
      data: {
        id: department.id.to_s,
        type: :department,
        attributes: {
          code: department.code,
          name: department.name
        }
      }
    )
  end
end
