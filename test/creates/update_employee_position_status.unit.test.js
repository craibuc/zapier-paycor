const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

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
        EmployeeId: '0a6cca41-1c89-4771-a54e-4cba75c48b01',
        EmploymentStatus: "Active",
        RehireDate: "2020-05-21T00:00:00Z",
        EmploymentType: "Casual",
        WorkLocation: "Cincinnati",
        JobTitle: "Software Engineer",
        Flsa: "HourlyExempt",
        ManagerId: "44480aa9-08d8-0000-0000-0000fd0d0300",
        DepartmentId: "3c88ef90-5e35-0000-0000-0000fb0d0300"
      },
    };

    const response = {
      "ResourceUrl": {
        "id": "d63759d5-40cc-4ec2-98df-772342f1b974",
        "url": "v1/myresources/resource?resourceID=d63759d5-40cc-4ec2-98df-772342f1b974"
      }
    }

    // mocks the next request that matches this url and body
    nock(`https://${bundle.authData.subdomain}.paycor.com/v1`)
      .put(`/employees/${ bundle.inputData.EmployeeId }/positionandstatus`)
      .reply(200, response);

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
