const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Trigger - get_work_locations', () => {

  it('should get an array', async () => {

    // arrange
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
        subscription_key: process.env.SUBSCRIPTION_KEY,
        legal_entity_id: process.env.LEGAL_ENTITY_ID,
      },
    };

    const response = {
      "hasMoreResults": false,
      "continuationToken": null,
      "additionalResultsUrl": null,
      "records": [
          {
              "id": '616aca68-6543-451a-8eff-46959c70376b',
              "name": "Acme, Inc.",
              "addresses": [
                  {
                      "type": "Mailing",
                      "streetLine1": "1234 Maple Street",
                      "streetLine2": null,
                      "suite": null,
                      "city": "Minneapolis",
                      "state": "MN",
                      "country": "USA",
                      "county": "Hennepin",
                      "zipCode": "12345"
                  },
                  {
                      "type": "Physical",
                      "streetLine1": "1234 Maple Street",
                      "streetLine2": null,
                      "suite": null,
                      "city": "Minneapolis",
                      "state": "MN",
                      "country": "USA",
                      "county": "Hennepin",
                      "zipCode": "12345"
                  }
              ],
              "phones": [],
              "locationNumber": null,
              "storeId": "Acme, Inc.",
              "isFmlaEligible": true
          }
      ]
    }

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .get(`/legalentities/${bundle.authData.legal_entity_id}/worklocations`)
      .reply(200, response);

    // act
    const results = await appTester(
      App.triggers['get_work_locations'].operation.perform,
      bundle
    );
  
    // console.log('results',results)
  
    // assert
    expect(results.length).toBeGreaterThan(0)

  });

});
