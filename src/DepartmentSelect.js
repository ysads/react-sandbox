import React from 'react';
import PropTypes from 'prop-types';

function DepartmentSelect ({ value, onChange }) {
  const departments = [
    { id: '', name: 'All Departments' },
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Finances' },
    { id: 3, name: 'Sales' },
    { id: 4, name: 'Talent & Culture' },
    { id: 5, name: 'Marketing' },
    { id: 6, name: 'Operations' },
    { id: 7, name: 'Research & Development' }
  ];

  const changeSelection = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="departmentName" data-test="label">
        Department
      </label>
      <select
        id="departmentName"
        value={value}
        onChange={(e) => changeSelection(e)}
        data-test="select"
      >
        {departments.map(department =>
          <option key={department.id} value={department.id} data-test="option">
            {department.name}
          </option>
        )}
      </select>
    </div>
  );
}

DepartmentSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DepartmentSelect;
