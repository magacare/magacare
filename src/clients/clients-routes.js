const { createClient, updateClient, searchOneClienteById, searchAllClients } = require('./clients-controller');
const { ClientSchemaController } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/clients';
  app.post(
    defaultRoute,
    validator.validateFields(ClientSchemaController),
    createClient,
  );
  app.get(
    `${defaultRoute}/:_id`,
    searchOneClienteById
  );
  app.get(
    defaultRoute,
    searchAllClients
  );
  app.put(
    `${defaultRoute}/:id`,
    validator.validateFields(ClientSchemaController),
    updateClient,
  );
};
