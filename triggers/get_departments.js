const perform = async (z, bundle) => {
  const options = {
    url: `https://{{bundle.authData.subdomain}}.paycor.com/v1/legalentities/${bundle.authData.legal_entity_id}/departments`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': bundle.authData.subscription_key,
      Authorization: `bearer ${bundle.authData.access_token}`,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    return results.records;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: 
    {
      Id: "cb4a1b67-000c-0000-0000-000066000000",
      Code: 123,
      Description: "Department 123",
      ParentId: "cb4a1b67-000c-0000-0000-000066000077",
      Level: 2,
      PayrollId: "cb4a1b67-000c-0000-0000-000066000077",
      PayrollDescription: "string",
      WorkLocationId: "5245ae3d-e570-0000-0000-000066000000",
      WorkLocationName: "ACME East is an open concept office."
    },
    outputFields: [
      { key: 'id', type: 'string' },
      { key: 'code', type: 'integer' },
      { key: 'description', type: 'string' },
    ],
  },
  display: {
    description: 'Get a list of departments.',
    hidden: true,
    label: 'Get Departments',
  },
  key: 'get_departments',
  noun: 'Departments',
};