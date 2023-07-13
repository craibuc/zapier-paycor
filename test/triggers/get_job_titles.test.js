const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Trigger - get_job_titles', () => {
  
  it('should get an array', async () => {

    // arrange
    const bundle = {
      authData: {
        subdomain: process.env.SUBDOMAIN,
        access_token: process.env.ACCESS_TOKEN,
        subscription_key: process.env.SUBSCRIPTION_KEY,
        tenant_id: process.env.TENANT_ID,
      },
    };

    const response = {
      "hasMoreResults": false,
      "continuationToken": null,
      "additionalResultsUrl": null,
      "records": [
          {
              "jobTitleId": "dff8438a-f7d6-4ecd-9262-21a7fa85cd92",
              "jobTitle": "HR Default",
              "jobCode": null,
              "jobCategory": null,
              "isArchived": false,
              "tenant": {
                  "id": "204857",
                  "url": "/v1/tenants/204857"
              }
          }
      ]
    }

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .get(`/tenants/${bundle.authData.tenant_id}/jobtitles`)
      .reply(200, response);

    // act
    const results = await appTester(
      App.triggers['get_job_titles'].operation.perform,
      bundle
    );

    // console.log('results',results)
  
    // assert
    expect(results.length).toBeGreaterThan(0)

  });

});
