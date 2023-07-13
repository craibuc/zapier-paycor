const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Trigger - get_paygroups', () => {

  it('should get an array', async () => {

    // arrange
    const bundle = {
      authData: {
        subdomain: process.env.SUBDOMAIN,
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
              "legalEntityId": 11111,
              "payrollId": 'f3cfb121-a2b5-46a9-839d-fa83ad4075d6',
              "payrollDescription": "Lorem Ipsum",
              "payGroupId": 'b2e2dbf6-f679-4914-85bf-18745ccdb624',
              "payGroupName": "Weekly",
              "payGroupFrequency": "Weekly"
          }
      ]
    }

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .get(`/legalentities/${bundle.authData.legal_entity_id}/paygroups`)
      .reply(200, response);

    // act
    const results = await appTester(
      App.triggers['get_paygroups'].operation.perform,
      bundle
    );

    // console.log('results',results)
  
    // assert
    expect(results.length).toBeGreaterThan(0)

  });

});
