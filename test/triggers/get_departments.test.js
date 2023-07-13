const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Trigger - get_departments', () => {
  
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
              "id": 'a3d47eda-fd33-4624-aba1-1701038d664d',
              "code": "2",
              "description": "Lorem",
              "parentId": null,
              "level": 2,
              "payrollId": '8e6af720-6836-4d1e-93de-fd0e4d0a8659',
              "payrollDescription": "Lorem Ipsum",
              "workLocationId": 'acf7f928-3b58-44fa-8738-ecece96baaba',
              "workLocationName": "Acme"
          },
          {
              "id": '0c3098e9-4aca-4e89-ba7a-0f1cd751e57e',
              "code": "9",
              "description": "Ipsum",
              "parentId": null,
              "level": 2,
              "payrollId": '8e6af720-6836-4d1e-93de-fd0e4d0a8659',
              "payrollDescription": "Lorem Ipsum",
              "workLocationId": 'acf7f928-3b58-44fa-8738-ecece96baaba',
              "workLocationName": "Acme"
          },
      ]
    }

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .get(`/legalentities/${bundle.authData.legal_entity_id}/departments`)
      .reply(200, response);

    // act
    const results = await appTester(
      App.triggers['get_departments'].operation.perform,
      bundle
    );

    // console.log('results',results)
  
    // assert
    expect(results.length).toBeGreaterThan(0)

  });

});
