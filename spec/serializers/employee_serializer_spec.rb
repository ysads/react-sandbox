# frozen_string_literal: true

require 'rails_helper'

describe EmployeeSerializer do
  it 'serializes object using json api' do
    employee = create(:employee)

    result = described_class.new(employee).serializable_hash

    expect(result).to eq(
      data: {
        id: employee.id.to_s,
        type: :employee,
        attributes: {
          age: employee.age,
          first_name: employee.first_name,
          last_name: employee.last_name,
        },
        relationships: {
          department: {
            data: {
              id: employee.department_id.to_s,
              type: :department
            }
          }
        }
      }
    )
  end
end
