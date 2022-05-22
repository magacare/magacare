const { createClient, updateClient } = require('./clients-controller');
const { ClientSchemaController } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/clients';
  app.post(
    defaultRoute,
    validator.validateFields(ClientSchemaController),
    createClient,
  );
  app.put(
    defaultRoute+"/:_id",
    validator.validateFields(ClientSchemaController),
    updateClient,
);
};
