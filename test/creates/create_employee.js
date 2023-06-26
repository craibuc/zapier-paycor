const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const nock = require('nock');

describe('Create - create_employee', () => {

  it('should create an object', async () => {

    // arrange
    const bundle = {
      authData: {
        subscription_key: process.env.SUBSCRIPTION_KEY,
        access_token: process.env.ACCESS_TOKEN,
      },
      inputData: {
        LegalEntityId: 123666,
        EmployeeNumber: 12345,
        AlternateEmployeeNumber: 1234567890,
        Prefix: "None",
        FirstName: "Charles",
        MiddleName: "Lutwidge",
        LastName: "Dodgson",
        Suffix: "None",
        HomeEmail: "string",
        WorkEmail: "string",
        Phones: [
          {
            CountryCode: "+1",
            AreaCode: 513,
            PhoneNumber: "555-2300",
            Type: "Unknown"
          }
        ],
        SocialSecurityNumber: 555555555,
        BirthDate: "1944-04-01T00:00:00Z",
        Gender: "Male",
        Ethnicity: "AmerIndorAKNative",
        MaritalStatus: "Single",
        WorkLocation: "string",
        JobTitle: "Software Engineer",
        HireDate: "2000-11-01T00:00:00Z",
        ReHireDate: "2020-05-21T00:00:00Z",
        Status: "Active",
        Flsa: "HourlyExempt",
        Type: "Casual",
        ManagerEmpId: "52a2s23-0000-0000-0000-0007d0009840",
        PaygroupDescription: "string",
        DepartmentCode: 0,
        Veteran: "Yes",
        Disability: "Yes",
        PrimaryAddress: {
          StreetLine1: "4811 Montgomery Road",
          StreetLine2: "Building A",
          Suite: "Suite 100",
          City: "Cincinnati",
          State: "OH",
          Country: "USA",
          County: "Hamilton",
          ZipCode: 45212
        }
      },
    };

    // mocks the next request that matches this url and querystring
    nock('https://apis.paycor.com/v1')
      .post('/emmployees',bundle.inputData)
      .reply(200, {
        ResourceUrl: { 
          id: 'd63759d5-40cc-4ec2-98df-772342f1b974',
          url: 'v1/myresources/resource?resourceID=d63759d5-40cc-4ec2-98df-772342f1b974' 
        }
      });

    // act
    const result = await appTester(
      App.creates['create_employee'].operation.perform,
      bundle
    );

    // assert
    result.should.not.be.an.Array();
    results.should.have.property('id');
    results.should.have.property('url');

  });

});
