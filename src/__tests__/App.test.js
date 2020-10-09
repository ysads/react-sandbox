import React from 'React';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import EmployeesTable from '../EmployeesTable';
import DepartmentSelect from '../DepartmentSelect';


const employeeMock = {
  id: '1',
  type: 'employee',
  attributes: {
    first_name: 'John',
    last_name: 'Doe',
    age: 27
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

const departmentMock = {
  id: '1',
  type: 'department',
  attributes: {
    name: 'Department'
  }
};

const fetchMock = (response) => {
  return new Promise((resolve) => {
    resolve({
      json: () => Promise.resolve(response)
    });
  });
};

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
});

afterAll(() => {
  global.fetch.mockClear();
});

describe('App', () => {
  let wrapper;

  beforeEach(async () => {
    global.fetch.mockImplementation(() => fetchMock({
      data: [employeeMock],
      included: [departmentMock]
    }));
  });

  it('renders DepartmentSelect', async () => {
    await act(async () => {
      wrapper = mount(<App />);
    });

    expect(wrapper.find(DepartmentSelect)).toBeTruthy();
  });

  it('renders EmployeesTable', async () => {
    await act(async () => {
      wrapper = mount(<App />);
    });

    expect(wrapper.find(EmployeesTable)).toBeTruthy();
  });

  describe('when component mounts', () => {
    it('queries api for employees', async () => {
      await act(async () => {
        wrapper = mount(<App />);
      });

      expect(global.fetch).toBeCalledWith(expect.stringContaining('page=1'));
      expect(global.fetch).toBeCalledWith(expect.stringContaining('department_id='));
    });
  });

  describe('when `more` button is clicked', () => {
    it('queries api for next page', async () => {
      await act(async () => {
        wrapper = mount(<App />);
      });

      global.fetch.mockImplementationOnce(() => fetchMock({
        data: [{ ...employeeMock, id: 2 }],
        included: [departmentMock]
      }));

      await act(async () => {
        wrapper.find("[data-test='submit']").simulate('click');
      });

      expect(global.fetch).toBeCalledWith(expect.stringContaining('page=2'));
    });
  });

  describe('when department select changes the selected department', () => {
    it('queries api using new selected department and first page', async () => {
      await act(async () => {
        wrapper = mount(<App />);
        wrapper.find('[data-test="select"]').simulate('change', { target: { value: 5 } });
      });

      expect(global.fetch).toBeCalledWith(expect.stringContaining('page=1'));
      expect(global.fetch).toBeCalledWith(expect.stringContaining('department_id=5'));
    });
  });
});