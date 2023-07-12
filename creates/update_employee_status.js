const perform = async (z, bundle) => {
    const options = {
        url: `https://${bundle.authData.subdomain}.paycor.com/v1/employees/${bundle.inputData.EmployeeId}/status`,
        skipThrowForStatus: true,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Ocp-Apim-Subscription-Key': bundle.authData.subscription_key,
            Authorization: `bearer ${bundle.authData.access_token}`,
        },
        body: {
            EffectiveDate: '{{bundle.inputData.EffectiveDate}}',
            EmployeeStatus: '{{bundle.inputData.EmployeeStatus}}',
            EmployeeStatusReasonId: '{{bundle.inputData.EmployeeStatusReasonId}}',
            EligibleForRehire: '{{bundle.inputData.EligibleForRehire}}',
            IsVoluntaryByEmployee: bundle.inputData.IsVoluntaryByEmployee === 'Yes' ? true : false,
            Notes: '{{bundle.inputData.Notes}}',
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
        description: "Modifies an employee's employement status.",
        hidden: false,
        label: 'Update Employee Status',
    },
    key: 'update_employee_status',
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
                key: 'EffectiveDate',
                label: 'Effective Date',
                type: 'datetime',
                required: true,
                list: false,
                altersDynamicFields: false,
                helpText: 'Date at which the employee status update takes effect.'
            },
            {
                key: 'EmployeeStatus',
                label: 'Employee Status',
                type: 'string',
                default: 'Active',
                choices: [
                    'Active',
                    'Deceased',
                    'LongTermDisability',
                    'ShortTermDisability',
                    'Fmla',
                    'LaidOff',
                    'LeaveWithPay',
                    'LeaveWithoutPay',
                    'ThirdPartyPayable',
                    'Resigned',
                    'Retired',
                    'Terminated',
                    'WorkersCompensation',
                ],
                required: true,
                list: false,
                altersDynamicFields: false,
                helpText: 'Enumeration of valid Employment Status values.'
            },
            {
                key: 'EmployeeStatusReasonId',
                label: 'Employee Status Reason',
                type: 'string',
                dynamic: 'get_status_reasons.id.value',
                required: false,
            },
            {
                key: 'EligibleForRehire',
                label: 'Eligible for Rehire?',
                type: 'string',
                required: false,
                // default: 'Yes',
                choices: [
                    'Yes',
                    'No',
                ],
                list: false,
                altersDynamicFields: false,
            },
            {
                key: 'IsVoluntaryByEmployee',
                label: 'Voluntary?',
                type: 'string',
                // default: 'Yes',
                choices: [
                    'Yes',
                    'No',
                ],
                required: false,
                list: false,
                altersDynamicFields: false,
            },
            {
                key: 'Notes',
                label: 'Notes',
                type: 'string',
                required: false,
                list: false,
                altersDynamicFields: false,
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
