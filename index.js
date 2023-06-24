const authentication = require('./authentication');

const onboardEmployeeCreate = require('./creates/onboard_employee.js');
const getEmployeeCreate = require('./creates/get_employee.js');

const findEmployeeSearch = require('./searches/find_employee.js');

const getDepartmentsTrigger = require('./triggers/get_departments.js');
const getLegalEntitiesTrigger = require('./triggers/get_legal_entities.js');
const getPaygroupsTrigger = require('./triggers/get_paygroups.js');
const getWorkLocationsTrigger = require('./triggers/get_work_locations.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  searches: { 
    [findEmployeeSearch.key]: findEmployeeSearch 
  },
  creates: {
    [onboardEmployeeCreate.key]: onboardEmployeeCreate,
    [getEmployeeCreate.key]: getEmployeeCreate,
  },
  triggers: {
    [getDepartmentsTrigger.key]: getDepartmentsTrigger,
    [getLegalEntitiesTrigger.key]: getLegalEntitiesTrigger,
    [getPaygroupsTrigger.key]: getPaygroupsTrigger,
    [getWorkLocationsTrigger.key]: getWorkLocationsTrigger,
  },
  authentication: authentication,
};
