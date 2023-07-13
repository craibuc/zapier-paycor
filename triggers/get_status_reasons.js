const perform = async (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.subdomain}.paycor.com/v1/legalentities/${bundle.authData.legal_entity_id}/statusReasons/TerminationReason`,
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
    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    // inputFields: [
    //   {
    //     key: 'statusCategory',
    //     label: 'Status Category',
    //     type: 'string',
    //     required: true,
    //     choices: [
    //       'TerminationReason',
    //       'LeaveReason',
    //       'ReturnReason',
    //     ],
    //   },
    // ],
    sample: {
      "Id": "3c88ef90-5e35-0000-0000-0000fb0d0300",
      "StatusCategory": "Termination",
      "Value": "Sick"
  },
    outputFields: [
      { key: 'id', type: 'string' },
      { key: 'value', type: 'string' },
    ],
  },
  display: {
    description: 'Gets a list of status reasons for the legal entity.',
    hidden: true,
    label: 'Get Status Reasons',
  },
  key: 'get_status_reasons',
  noun: 'Reasons',
};
