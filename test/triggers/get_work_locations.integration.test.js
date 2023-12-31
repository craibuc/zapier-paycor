const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

beforeAll(() => {
  // TODO: get a new access token
});

describe('Trigger - get_work_locations', () => {

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
