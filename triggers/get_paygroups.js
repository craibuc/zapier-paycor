const perform = async (z, bundle) => {
  const options = {
    url: `https://apis.paycor.com/v1/legalentities/${bundle.authData.legal_entity_id}/paygroups`,
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

    // becasue Zapier requires that each array element have an id property
    results.records.forEach(element => {
      element.id = element.payGroupId
    });

    return results.records;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: {
      legalEntityId: 501123,
      payrollId: "52a2s23-0000-0000-0000-0007d0009840",
      payrollDescription: "string",
      payGroupId: "52a2s23-0000-0000-0000-0007d0009840",
      payGroupName: "string",
      payGroupFrequency: "string"
    },
    outputFields: [
      { key: 'payGroupId', type: 'string' },
      { key: 'payGroupName', type: 'string' },
    ],
  },
  display: {
    description: 'Gets a list of pay groups for the legal entity.',
    hidden: true,
    label: 'Get Paygroups',
  },
  key: 'get_paygroups',
  noun: 'Paygroup',
};
