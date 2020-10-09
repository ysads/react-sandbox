import React, { useState, useEffect } from 'react';
import './App.css';
import DepartmentSelect from './DepartmentSelect';
import EmployeesTable from './EmployeesTable';

function App () {
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const resetState = (dep) => {
    setDepartments([]);
    setEmployees([]);
    setPage(1);
    setSelectedDepartment(dep);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/employees?page=${page}&department_id=${selectedDepartment}&include=department&fields[department]=name&fields[employee]=first_name,last_name,age,department`).then((response) => {
      response.json().then(({ data, included }) => {
        setDepartments([...departments, ...included]);
        setEmployees([...employees, ...data]);
      });
    });
  }, [page, selectedDepartment]);

  return (
    <div className="App">
      <DepartmentSelect
        value={selectedDepartment}
        onChange={(department) => resetState(department)}
      />
      <EmployeesTable
        employees={employees}
        departments={departments}
      />
      <button data-test="submit" onClick={() => setPage(page + 1)}>More</button>
    </div>
  );
}

export default App;
