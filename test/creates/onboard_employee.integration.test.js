const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

beforeAll(() => {
  // TODO: get a new access token
});

describe('Create - onboard_employee', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {

    // arrange
    const bundle = {
      authData: {
        subdomain: process.env.SUBDOMAIN,
        access_token: process.env.ACCESS_TOKEN,
        subscription_key: process.env.SUBSCRIPTION_KEY,
        legal_entity_id: process.env.LEGAL_ENTITY_ID,
      },

      inputData: {
          // ExportedByEmailAddress: "email@domain.com",
          FirstName: "Edwin",
          LastName: "Hubble",
          PreferredName: "Carroll",
          Gender: "Male",
          Ethnicity: "AmerIndorAKNative",
          Disability: "Yes",
          VeteranStatus: "Yes",
          Address1: "4811 Montgomery Road",
          Address2: "Building A",
          City: "Cincinnati",
          State: "OH",
          Zip: 45212,
          CountryCode: "USA",
          MobilePhone: "(123) 456-7890",
          HomePhone: "(123) 456-7890",
          HomeEmailAddress: "homeEmail@domain.com",
          StartDate: "2019-11-01T00:00:00Z",
          JobTitle: "Software Engineer",
          WorkLocationId: "dc069074-24b2-0000-0000-000014e00100",
          DepartmentCode: 80,
          BaseSalary: 10000,
          SalaryFrequency: "Bi-Weekly",
      },
    };

    // act
    const result = await appTester(
      App.creates['onboard_employee'].operation.perform,
      bundle
    );

    // assert
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('url');

  });
});
