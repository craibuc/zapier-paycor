const perform = async (z, bundle) => {

  const getData = async (url) => {

    const options = {
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${bundle.authData.access_token}`,
        'Ocp-Apim-Subscription-Key': bundle.authData.subscription_key,
      },
    };

    return z.request(options).then((response) => {
      response.throwForStatus();
      const results = response.json;

      return results

    });

  }

  let employees = []
  let proceed = false

  const baseUrl = 'https://{{bundle.authData.subdomain}}.paycor.com'
  let path = `/v1/legalentities/${bundle.authData.legal_entity_id}/employeesIdentifyingData`

  const ssn = bundle.inputData.ssn.replace(/-/g,'')

  do {

    const r = await getData(`${baseUrl}${path}`);

    // filter the employees node
    const employee = r.records.filter( e => e.socialSecurityNumber === ssn )
    if (employee.length > 0) {
      employees = employees.concat(employee);
      break;
    }

    // append to array
    // employees = employees.concat(r.records);

    // enable another loop
    proceed = r.hasMoreResults

    // set path to next page of data
    path = r.additionalResultsUrl

  } while (proceed);
  
  return employees;

};

module.exports = {
  key: 'find_employee',
  noun: 'Employee',
  display: {
    label: 'Find Employee',
    description: 'Finds an employee by their Social-Security number.',
    hidden: false,
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'ssn',
        label: 'SSN',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      FirstName: "Charles",
      LastName: "Peterson",
      SocialSecurityNumber: 555555555,
      EmployeeId: "52b68a4a-196c-0000-0000-0007d5268Sa2",
      EmployeeNumber: 123666,
      BirthDate: "1944-04-01T00:00:00Z",
      Status: "Active"
    },
    outputFields: [
      { key: 'firstName' },
      { key: 'lastName' },
      { key: 'socialSecurityNumber' },
      { key: 'employeeId' },
      { key: 'employeeNumber' },
      { key: 'birthDate', type: 'datetime' },
      { key: 'status' },
    ],
    perform: perform,
  },
};