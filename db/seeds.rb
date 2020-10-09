require 'csv'

departments = [
  { name: 'Technology', code: 'tech' },
  { name: 'Finances', code: '$' },
  { name: 'Sales', code: 'sales' },
  { name: 'Talent & Culture', code: 'hr' },
  { name: 'Marketing', code: 'ads' },
  { name: 'Operations', code: 'op' },
  { name: 'Research & Development', code: 'rnd' }
].map { |department| { **department, created_at: Time.now, updated_at: Time.now } }

Department.insert_all(departments)
departments = Department.all

employees = CSV.read('db/employees.csv', headers: true).map do |row|
  department_id = departments.find { |department| department.code == row['department_code'] }.id

  {
    **row.to_h.symbolize_keys.except(:department_code),
    created_at: Time.now, updated_at: Time.now, department_id: department_id
  }
end

Employee.insert_all(employees)
