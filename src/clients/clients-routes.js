const {
  createClient,
  updateClient,
  searchOneClienteById,
  searchClientsByFilter,
  searchOneClientByEmail,
} = require('./clients-controller');
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
    `${defaultRoute}/email`,
    searchOneClientByEmail,
  );
  app.get(
    `${defaultRoute}/:id`,
    searchOneClienteById,
  );
  app.get(
    defaultRoute,
    searchClientsByFilter,
  );
  app.put(
    `${defaultRoute}/:id`,
    validator.validateFields(ClientSchemaController),
    updateClient,
  );
};
