import React from 'React';
import EmployeesTable from '../EmployeesTable';
import { shallow } from 'enzyme';

const employeeMock = {
  id: '1',
  type: 'employee',
  attributes: {
    first_name: 'John',
    last_name: 'Doe',
    age: 30
  },
  relationships: {
    department: {
      data: {
        id: '4',
        type: 'department'
      },
    },
  }
};
const employeesMock = [
  { ...employeeMock, id: '1' },
  { ...employeeMock, id: '2' }
];

const departmentMock = [{
  id: '4',
  type: 'department',
  attributes: {
    name: 'DepartmentName'
  }
}];

describe('EmployeesTable', () => {
  let wrapper = shallow(
    <EmployeesTable employees={employeesMock} departments={departmentMock} />
  );

  it('renders header', () => {
    const header = wrapper.find("[data-test='table-header']").text();

    expect(header).toContain('First name');
    expect(header).toContain('Last name');
    expect(header).toContain('Age');
    expect(header).toContain('Department');
  });

  it('renders a row for each employee', () => {
    expect(wrapper.find("[data-test='employee-row']").length).toBe(2);
  });

  it('renders respective employee data at each row', () => {
    const row = wrapper.find('tbody tr').at(0);
    
    expect(row.text()).toContain('John');
    expect(row.text()).toContain('Doe');
    expect(row.text()).toContain(30);
    expect(row.text()).toContain('DepartmentName');
  });
});