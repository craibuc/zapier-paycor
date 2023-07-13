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
        // params: {
        //     statusFilter: 'Active',
        //     include: 'Position'
        // },
      };
  
      return z.request(options).then((response) => {
        response.throwForStatus();
        const results = response.json;
        return results
      });
  
    }
  
    let employees = []
    let managerIds = []
    let proceed = false
  
    const baseUrl = 'https://{{bundle.authData.subdomain}}.paycor.com'
    let path = `/v1/legalentities/${bundle.authData.legal_entity_id}/employees?statusFilter=Active&include=Position`
    
    do {
  
        const r = await getData(`${baseUrl}${path}`);
    
        // add a `name` field
        r.records.forEach(e => {
            // add full name
            e.name = `${e.firstName} ${e.lastName}`
            // capturer manager ids
            if ( e.positionData.manager != null ) { managerIds.push(e.positionData.manager.id) }
        });

        // append to array
        employees = employees.concat(r.records);

        // enable another loop
        proceed = r.hasMoreResults

        // set path to next page of data
        path = r.additionalResultsUrl
  
    } while (proceed);

    const uniqueManagerIds = [...new Set(managerIds)];

    // filter the employees node
    const managers = employees.filter( e => uniqueManagerIds.includes(e.id) )

    // sort by lastname, firstname
    managers.sort((a, b) => ( `${a.lastName},${a.firstName}` >  `${b.lastName},${b.firstName}`) ? 1 : -1);

    return managers;

};

module.exports = {
    operation: {
        perform: perform,
        outputFields: [
            { key: 'id', type: 'string' },
            { key: 'name', type: 'string' },
        ],
        sample: {
            "id": "df5566ef-196c-0000-0000-0007d5268Sa2",
            "name": "Charles Dodgson",
        },
    },
    display: {
        description: 'Get the list of managers.',
        hidden: true,
        label: 'Get Managers',
    },
    key: 'get_managers',
    noun: 'Manager',
};