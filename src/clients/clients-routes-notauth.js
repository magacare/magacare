const {
  createClient,
} = require('./clients-controller');

const { ClientSchemaController } = require('../validate/schema-controller');
const validator = require('../validate/validate');

const defaultRoute = '/clients';

module.exports = (app) => {
  app.post(
    defaultRoute,
    validator.validateFields(ClientSchemaController),
    createClient,
  );
};
