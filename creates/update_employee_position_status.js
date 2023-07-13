const perform = async (z, bundle) => {
    const options = {
        url: `https://${bundle.authData.subdomain}.paycor.com/v1/employees/${bundle.inputData.EmployeeId}/positionandstatus`,
        skipThrowForStatus: true,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Ocp-Apim-Subscription-Key': bundle.authData.subscription_key,
            Authorization: `bearer ${bundle.authData.access_token}`,
        },
        body: {
            EmployeeStatus: '{{bundle.inputData.EmployeeStatus}}',
            RehireDate: '{{bundle.inputData.RehireDate}}',
            EmploymentType: '{{bundle.inputData.EmploymentType}}',
            WorkLocation: '{{bundle.inputData.WorkLocation}}',
            JobTitle: '{{bundle.inputData.JobTitle}}',
            Flsa: '{{bundle.inputData.Flsa}}',
            ManagerId: '{{bundle.inputData.ManagerId}}',
            DepartmentId: '{{bundle.inputData.DepartmentId}}',
        }
    };

    return z.request(options).then((response) => {

        const results = response.json;

        if (response.status >= 400) {
            throw new z.errors.Error(results.Detail, results.Title, response.status);
        }

        return results.ResourceUrl;
        
    });
};
  
module.exports = {
    display: {
        description: "Modifies an employee's position and status.",
        hidden: false,
        label: 'Update Employee Position and Status',
    },
    key: 'update_employee_position_status',
    noun: 'Employee',
    operation: {
        perform: perform,
        inputFields: [
            {
                key: 'EmployeeId',
                label: 'Employee Id',
                required: true,
                list: false,
                altersDynamicFields: false,
                helpText: 'Id of the employee',
            },
            {
                key: 'EmployeeStatus',
                label: 'Employee Status',
                type: 'string',
                default: 'Active',
                choices: [
                    'Active',
                ],
                required: true,
                list: false,
                altersDynamicFields: false,
                helpText: 'Enumeration of valid Employment Status values.'
            },
            {
                key: 'RehireDate',
                label: 'Rehire Date',
                type: 'datetime',
                required: true,
                list: false,
                altersDynamicFields: false,
                helpText: 'Date on which the employee is rehired.'
            },
            {
                key: 'EmploymentType',
                label: 'Employment Type',
                type: 'string',
                required: true,
                default: 'Regular',
                choices: ['Casual','IndependentContractor','Regular','Seasonal','Temporary','Variable'],
                list: false,
                altersDynamicFields: false,
                helpText: 'Employment types'
            },
            {
                key: 'WorkLocation',
                label: 'Work Location',
                type: 'integer',
                dynamic: 'get_work_locations.name',
                required: true,
                list: false,
                altersDynamicFields: false,
                helpText: 'The name of the Work Location to associate with new hire.'
            },
            {
                key: 'JobTitle',
                label: 'Job Title',
                type: 'string',
                dynamic: 'get_job_titles.jobTitle',
                required: false,
                list: false,
                altersDynamicFields: false,
                helpText: "The employee's job title."
            },
            {
                key: 'Flsa',
                label: 'FLSA Type',
                type: 'string',
                choices: [
                  'HourlyExempt',
                  'HourlyNonExempt',
                  'SalaryExempt',
                  'SalaryNonExempt',
                ],
                helpText: 'Fair Labor Standards Act (FLSA) employment values.',
                required: false,
                list: false,
                altersDynamicFields: false,
            },
            {
                key: 'ManagerId',
                label: "Manager",
                required: false,
                type: 'string',
                dynamic: 'get_managers.id.name',
                list: false,
                altersDynamicFields: false,
                helpText: "The employee's manager."
            },
            {
                key: 'DepartmentId',
                label: 'Department',
                type: 'string',
                dynamic: 'get_departments.id.description',
                required: false,
                list: false,
                altersDynamicFields: false,
                helpText: 'Department'
              },        
        ],
        sample: {
            Id: 'd63759d5-40cc-4ec2-98df-772342f1b974',
            Url: 'v1/myresources/resource?resourceID=d63759d5-40cc-4ec2-98df-772342f1b974',
        },
        outputFields: [
            { key: 'id' },
            { key: 'url' },
        ],
    },
};
