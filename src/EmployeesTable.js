import React from 'react';
import PropTypes from 'prop-types';

function EmployeesTable ({ employees, departments }) {
  const departmentOf = (employee) => {
    return departments.find((department) => {
      return department.id === employee.relationships.department.data.id;
    });
  };

  return (
    <table>
      <thead>
        <tr data-test="table-header">
          <td>
            First name
          </td>
          <td>
            Last name
          </td>
          <td>
            Age
          </td>
          <td>
            Department
          </td>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee =>
          <tr key={employee.id} data-test="employee-row">
            <td>
              {employee.attributes.first_name}
            </td>
            <td>
              {employee.attributes.last_name}
            </td>
            <td>
              {employee.attributes.age}
            </td>
            <td>
              {departmentOf(employee)?.attributes?.name}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired
};

export default EmployeesTable;
