const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

beforeAll(() => {
  // TODO: get a new access token
});

describe('Create - update_employee_position_status', () => {

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

    // act
    const result = await appTester(
      App.creates['update_employee_position_status'].operation.perform,
      bundle
    );

    // assert
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('url');

  });

});
