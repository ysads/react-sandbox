# frozen_string_literal: true

module Employees
  class List
    DEFAULT_PAGE_SIZE = 10

    def initialize(params)
      @params = params
    end

    def call
      base_query
      filter_by_deparment
      paginate
    end

    private

    attr_accessor :params, :result

    def base_query
      @result = Employee.all
    end

    def filter_by_deparment
      return if params[:department_id].blank?

      @result = result.joins(:department)
                      .where(departments: { id: params[:department_id] })
    end

    def paginate
      page = params[:page] || 1
      per = params[:per] || DEFAULT_PAGE_SIZE

      @result = result.page(page).per(per)
    end
  end
end
