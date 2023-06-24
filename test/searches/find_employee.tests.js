require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - find_employee', () => {

  zapier.tools.env.inject();

  describe('when a valid SSN is supplied', () => {

    it("retuns an array containing the employee's record", async () => {

      // arrange
      const bundle = {
        authData: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          subscription_key: process.env.SUBSCRIPTION_KEY,
          access_token: process.env.ACCESS_TOKEN,
          refresh_token: process.env.REFRESH_TOKEN,
          legal_entity_id: process.env.LEGAL_ENTITY_ID,
          tenant_id: process.env.TENANT_ID,
        },
  
        inputData: {
          ssn: process.env.SSN,
        },
      };
  
      // act
      const results = await appTester(
        App.searches['find_employee'].operation.perform,
        bundle
      );
  
      // assert
      results.should.be.an.Array();
      results.length.should.be.equal(1);
      results[0].should.have.property('employeeId');
  
    });
  
  });

  describe('when a invalid SSN is supplied', () => {

    it('returns an empty array', async () => {

      // arrange
      const bundle = {
        authData: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          subscription_key: process.env.SUBSCRIPTION_KEY,
          access_token: process.env.ACCESS_TOKEN,
          refresh_token: process.env.REFRESH_TOKEN,
          legal_entity_id: process.env.LEGAL_ENTITY_ID,
          tenant_id: process.env.TENANT_ID,
        },
  
        inputData: {
          ssn: '000-00-0000',
        },
      };
  
      // act
      const results = await appTester(
        App.searches['find_employee'].operation.perform,
        bundle
      );
  
      // assert
      results.should.be.an.Array();
      results.length.should.be.equal(0);
  
    });
  
  });

});
