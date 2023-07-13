const perform = async (z, bundle) => {
  const options = {
    url: `https://${bundle.authData.subdomain}.paycor.com/v1/tenants/${bundle.authData.tenant_id}/jobtitles`,
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

    // because Zapier requires that each array element have an id property
    results.records.forEach(element => {
      element.id = element.jobTitleId
    });

    return results.records;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: {
        jobTitleId: "5245ae3d-e570-0000-0000-000066000000",
        jobTitle: "Software Engineer.",
        jobCode: 12345,
        jobCategory: 9,
        isArchived: true,
        tenant: {
            Id: "d63759d5-40cc-4ec2-98df-772342f1b974",
            url: "v1/myresources/resource?resourceID=d63759d5-40cc-4ec2-98df-772342f1b974"
        }
    },
    outputFields: [
      // { key: 'jobTitleId', type: 'string' },
      { key: 'jobTitle', type: 'string' },
    ],
  },
  display: {
    description: 'Gets a list of job titles for the tenant.',
    hidden: true,
    label: 'Get Job Titles',
  },
  key: 'get_job_titles',
  noun: 'JobTitle',
};
