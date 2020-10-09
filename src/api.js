export default {
  fetchEmployees: async ({ page, departmentId }) => {
    fetch(`http://localhost:3001/employees?page=${page}&department_id=${departmentId}&include=department&fields[department]=name&fields[employee]=first_name,last_name,age,department`).then(response => {
      response.json().then(parsedResponse => {
        return parsedResponse;
      });
    });
    // return parsedResponse
    //     return parsedResponse
    //   })
    // })
  }
};