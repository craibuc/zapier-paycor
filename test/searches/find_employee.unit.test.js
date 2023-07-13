const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Search - find_employee', () => {

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
      
      const response = {
        "hasMoreResults": false,
        "records": [
            {
                "firstName": "John",
                "lastName": "Doe",
                "socialSecurityNumber": "000000000",
                "employeeId": 'bfdd24cf-a9a8-4da2-a09b-a62093432d97',
                "employeeNumber": "123456",
                "birthDate": "2000-01-01T00:00:00",
                "status": "Active"
            }
        ]
      }
  
      // mocks the next request that matches this url and body
      nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
        .get(`/legalentities/${bundle.authData.legal_entity_id}/employeesIdentifyingData`)
        .reply(200, response);
    
      // act
      const results = await appTester(
        App.searches['find_employee'].operation.perform,
        bundle
      );
  
      // assert
      expect(results[0]).toHaveProperty('employeeId');
      expect(results.length).toBe(1)
  
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
      expect(results.length).toBe(0)

    });
  
  });

});
