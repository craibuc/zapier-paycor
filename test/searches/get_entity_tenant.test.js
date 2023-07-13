const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Search - get_entity_tenant', () => {

  it('should get an array', async () => {

    // arrange
    const bundle = {
      authData: {
        subdomain: process.env.SUBDOMAIN,
        access_token: process.env.ACCESS_TOKEN,
        subscription_key: process.env.SUBSCRIPTION_KEY,
      },
    };

    const response = {
      "userLegalEntities": [
          {
              "legalEntityId": 111111,
              "tenantId": 222222
          }
      ]
    }

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .get('/legalentities/ActivatedLegalEntityTenantList')
      .reply(200, response);
  
    // act
    const results = await appTester(
      App.searches['get_entity_tenant'].operation.perform,
      bundle
    );

    // console.log('results',results)
  
    // assert
    expect(results.length).toBeGreaterThan(0)

  });

});
