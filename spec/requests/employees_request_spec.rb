# frozen_string_literal: true

require 'rails_helper'

describe EmployeesController do
  describe 'GET /employees' do
    let(:department) { create(:department) }
    let(:request_params) do
      {
        page: '1',
        department_id: department.id.to_s,
        include: 'department',
        fields: { employee: 'first_name,last_name,department' }
      }
    end

    it 'queries employees using proper list' do
      allow(Employees::List).to receive(:new).and_call_original

      get '/employees', params: request_params

      expect(Employees::List).to have_received(:new).with(
        ActionController::Parameters.new(request_params).permit!
      )
    end

    it 'serializes objects passing down fields and include specs' do
      employee = create(:employee, department: department)

      allow(EmployeeSerializer).to receive(:new)

      get '/employees', params: request_params

      expect(EmployeeSerializer).to have_received(:new).with(
        [employee],
        fields: { employee: %w[first_name last_name department] },
        include: %w[department]
      )
    end

    it 'has http status 200' do
      get '/employees', params: request_params

      expect(response).to have_http_status(200)
    end

    context 'when no fields param is given' do
      let(:request_params) do
        {
          department_id: department.id,
          include: 'department',
          page: 1
        }
      end

      it 'serializes objects passing _blank' do
        employee = create(:employee, department: department)

        allow(EmployeeSerializer).to receive(:new)
  
        get '/employees', params: request_params
  
        expect(EmployeeSerializer).to have_received(:new).with(
          [employee],
          fields: { employee: %i[_blank] },
          include: %w[department]
        )
      end
    end
  end
end
