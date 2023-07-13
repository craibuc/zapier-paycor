const perform = async (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.subdomain}.paycor.com/v1/legalentities/${bundle.authData.legal_entity_id}/worklocations`,
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
    canPaginate: false,
    outputFields: [
      { key: 'name' }
    ],
    sample: {
      Id: "5245ae3d-e570-0000-0000-000066000000",
      Name: "ACME East is an open concept office.",
      Addresses: [
        {
          StreetLine1: "4811 Montgomery Road",
          StreetLine2: "Building 6",
          Suite: "Suite 1000",
          City: "Cincinnati",
          State: "OH",
          Country: "USA",
          County: "Hamilton",
          ZipCode: "45212-0341",
          Type: "Unspecified"
        }
      ],
      Phones: [
        {
          CountryCode: "+1",
          AreaCode: 513,
          PhoneNumber: "555-2300",
          Type: "Unknown"
        }
      ],
      LocationNumber: "Number",
      StoreId: 18,
      IsFmlaEligible: true
    }
  },
  key: 'get_work_locations',
  noun: 'Location',
  display: {
    label: 'Get Work Locations',
    description: 'Gets the work locations for the tenant.',
    hidden: true,
    important: false,
  },
};
