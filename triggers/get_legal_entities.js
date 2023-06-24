const perform = async (z, bundle) => {
  const options = {
    url: 'https://apis.paycor.com/v1/legalentities/ActivatedLegalEntityTenantList',
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
    results.userLegalEntities.forEach(element => {
      element.id = element.legalEntityId
    });
    
    return results.userLegalEntities;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: { 
      legalEntityId: 501123, 
      tenantId: 678556 
    },
    outputFields: [
      { key: 'legalEntityId', type: 'integer' }, 
      { key: 'tenantId', type: 'integer' }
    ],
  },
  display: {
    description: 'Gets the legal entity.',
    hidden: true,
    label: 'Get Legal Entity',
  },
  key: 'get_legal_entities',
  noun: 'Legal Entity',
};
