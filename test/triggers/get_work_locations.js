require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Trigger - get_work_locations', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {

    // arrange
    const bundle = {
      authData: {
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
    results.should.be.an.Array();

  });

});
