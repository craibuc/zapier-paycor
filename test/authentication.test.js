/*
.Example
npm test -- authentication.test.js

run the tests in this file.
*/

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('authentication', () => {

  describe('perform', () => {

    describe('when valid credentials are supplied', () => {

        // arrange
        const bundle = {
            authData: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                refresh_token: process.env.REFRESH_TOKEN,
                subscription_key: process.env.SUBSCRIPTION_KEY,
            },
        };

        it('an access token is returned', async () => {
        
            // act
            const results = await appTester(
                App.authentication.sessionConfig.perform,
                bundle
            );

            // assert
            expect(results).toHaveProperty('access_token');
        });
      
    });

    describe.skip('when invalid credentials are supplied', () => {

        // arrange
        const bundle = {
            authData: {
                client_id: '40038d33-cb15-4b68-98ef-f05fe44d6904',
                client_secret: '40038d33-cb15-4b68-98ef-f05fe44d6904',
                refresh_token: '40038d33-cb15-4b68-98ef-f05fe44d6904',
            },
        };

      it('throws an error', async () => {

        // act/assert
        await expect(appTester(
            App.authentication.test,
            bundle
        )).rejects.toThrow();

      });

    });

  });

  describe.skip('test', () => {
  
    describe('when valid credentials are supplied', () => {

      it('returns meta data', async () => {
    
        // arrange
        const bundle = {
            authData: {
                access_token: process.env.ACCESS_TOKEN,
                subscription_key: process.env.SUBSCRIPTION_KEY,
            }
        };

        // act
        const results = await appTester(
            App.authentication.test,
            bundle
        );

        console.log('results',results)

        // assert
        expect(results.userLegalEntities[0]).toHaveProperty('legalEntityId');
        expect(results.userLegalEntities[0]).toHaveProperty('tenantId');

      });
  
    });

    describe('when invalid credentials are supplied', () => {

      it('throws an error', async () => {

        // arrange
        const bundle = {
            authData: {
                access_token: '40038d33-cb15-4b68-98ef-f05fe44d6904',
                subscription_key: '40038d33-cb15-4b68-98ef-f05fe44d6904',
            }
        };

        // act/assert
        await expect(appTester(
            App.authentication.test,
            bundle
        )).rejects.toThrow();

      });
  
    });

  });

});
