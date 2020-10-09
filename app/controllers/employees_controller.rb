# frozen_string_literal: true

class EmployeesController < ApplicationController
  # GET /employees
  def index
    employees = Employees::List.new(index_params).call

    render json: EmployeeSerializer.new(employees, fields: index_fields, include: index_include)
  end

  private

  def index_params
    params.permit(:page, :department_id, :include, fields: {})
  end

  def index_fields
    fields = index_params[:fields]
    fields ? fields.to_h.transform_values { |fields| fields.split(',') } : { employee: [:_blank] }
  end

  def index_include
    includes = index_params[:include]
    includes ? includes.split(',') : []
  end
end
