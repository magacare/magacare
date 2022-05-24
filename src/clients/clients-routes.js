const {
  createClient,
  updateClient,
  searchOneClienteById,
  searchOneClientByEmail,
  searchAllClients,
} = require('./clients-controller');

const { ClientSchemaController, ClientSchemaControllerUpdate } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/clients';
  app.post(
    defaultRoute,
    validator.validateFields(ClientSchemaController),
    createClient,
  );
  app.get(
    `${defaultRoute}/email`,
    searchOneClientByEmail,
  );
  app.get(
    `${defaultRoute}/id/:id`,
    searchOneClienteById,
  );
  app.get(
    defaultRoute,
    searchAllClients,
  );
  app.put(
    `${defaultRoute}/:id`,
    validator.validateFields(ClientSchemaControllerUpdate),
    updateClient,
  );
};
