import React from 'React';
import DepartmentSelect from '../DepartmentSelect';
import { shallow } from 'enzyme';

describe('DepartmentSelect', () => {
  it('renders a label', () => {
    const wrapper = shallow(<DepartmentSelect />);

    expect(wrapper.find("[data-test='label']").text()).toBe('Department');
  });

  it('renders an option for each department', () => {
    const wrapper = shallow(<DepartmentSelect />);

    expect(wrapper.find("[data-test='option']").length).toBe(8);
  });

  it('renders selected the option whose id is given as value', () => {
    const selectedDepartment = 1;
    const wrapper = shallow(<DepartmentSelect value={selectedDepartment} />);

    expect(wrapper.find("[data-test='select']").props().value).toBe(selectedDepartment);
  });

  it('calls onChange when option is clicked', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(<DepartmentSelect onChange={onChangeMock} />);

    wrapper.find("[data-test='select']").simulate('change', { target: { value : 2 } });

    expect(onChangeMock).toBeCalledWith(2);
  });
});