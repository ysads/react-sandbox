# frozen_string_literal: true

require 'rails_helper'

describe Employees::List do
  describe '#call' do
    it 'paginates query' do
      employees = create_list(:employee, 5)

      result = described_class.new(page: 2, per: 2).call

      expect(result).to contain_exactly(employees[2], employees[3])
    end

    it 'defaults pagination size to 10' do
      create_list(:employee, 11)

      result = described_class.new(page: 1).call

      expect(result.count).to eq(10)
    end

    context 'when given department_id' do
      it 'filters result by department' do
        create(:employee, department: create(:department))
        employee = create(:employee, department: create(:department))

        result = described_class.new(department_id: employee.department_id).call

        expect(result).to contain_exactly(employee)
      end
    end
  end
end
