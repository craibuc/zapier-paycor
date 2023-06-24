module.exports = {
  type: 'session',
  test: {
    headers: {
      Authorization: 'Bearer {{bundle.authData.access_token}}',
      'Ocp-Apim-Subscription-Key': '{{bundle.authData.subscription_key}}',
    },
    url: 'https://apis.paycor.com/v1/legalentities/ActivatedLegalEntityTenantList',
  },
  fields: [
    {
      computed: false,
      key: 'client_id',
      required: true,
      label: 'Client ID',
      type: 'string',
    },
    {
      computed: false,
      key: 'client_secret',
      required: true,
      label: 'Client Secret',
      type: 'string',
    },
    {
      computed: false,
      key: 'subscription_key',
      required: true,
      label: 'Subscription Key',
      type: 'string',
    },
    {
      computed: false,
      key: 'refresh_token',
      required: true,
      label: 'Refresh Token',
      type: 'string',
    },
    {
      computed: false,
      key: 'legal_entity_id',
      required: true,
      label: 'Legal Entity Id',
      type: 'string',
      helpText: 'LegalEntityId = ClientID',
    },
    {
      computed: false,
      key: 'tenant_id',
      required: true,
      label: 'Tenant ID',
      type: 'string',
      helpText: 'TenantId = CompanyId',
    },
    { 
      computed: true, 
      key: 'access_token', 
      required: false, 
      type: 'string' 
    },
  ],
  sessionConfig: {
    perform: {
      body: {
        grant_type: 'refresh_token',
        refresh_token: '{{bundle.authData.refresh_token}}',
        client_id: '{{bundle.authData.client_id}}',
        client_secret: '{{bundle.authData.client_secret}}',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      method: 'POST',
      params: { 'subscription-key': '{{bundle.authData.subscription_key}}' },
      url: 'https://apis.paycor.com/sts/v1/common/token',
    },
  },
  connectionLabel: '',
};
