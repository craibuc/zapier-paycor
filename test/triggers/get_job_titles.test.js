const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Trigger - get_job_titles', () => {
  
  it('should get an array', async () => {

    // arrange
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
        subscription_key: process.env.SUBSCRIPTION_KEY,
        tenant_id: process.env.TENANT_ID,
      },
    };

    // act
    const results = await appTester(
      App.triggers['get_job_titles'].operation.perform,
      bundle
    );

    console.log('results',results)
  
    // assert
    expect(results.length).toBeGreaterThan(0)

  });

});
