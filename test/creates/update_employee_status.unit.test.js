const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Create - update_employee_status', () => {

  it('updates an object', async () => {

    // arrange
    const bundle = {
      authData: {
        subdomain: process.env.SUBDOMAIN,
        access_token: process.env.ACCESS_TOKEN,
        subscription_key: process.env.SUBSCRIPTION_KEY,
      },
      inputData: {
        EmployeeId: '2a820a0b-9c9e-0000-0000-0000ff790200',
        EffectiveDate: '2023-07-11T00:00:00Z',
        EmployeeStatus: 'Terminated',
        EmployeeStatusReasonId: "53b2aafb-956d-4760-8e61-72c573505ae1",
        EligibleForRehire: "Yes",
        IsVoluntaryByEmployee: "Yes",
        Notes: "lorem ipsum",
      },
    };

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .put(`/employees/${ bundle.inputData.EmployeeId }/status`)
      .reply(200, {
        ResourceUrl: { 
          id: 'd63759d5-40cc-4ec2-98df-772342f1b974',
          url: 'v1/myresources/resource?resourceID=d63759d5-40cc-4ec2-98df-772342f1b974' 
        }
      });

    // act
    const result = await appTester(
      App.creates['update_employee_status'].operation.perform,
      bundle
    );

    // assert
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('url');

  });

});
