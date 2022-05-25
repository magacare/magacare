const {
  updateClient,
  searchOneClienteById,
  searchOneClientByEmail,
  searchAllClients,
  searchClientsByFilter,
  deleteClient,
} = require('./clients-controller');

const { ClientSchemaControllerUpdate } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/clients';
  app.get(
    `${defaultRoute}/email`,
    searchOneClientByEmail,
  );
  app.get(
    `${defaultRoute}/id/:id`,
    searchOneClienteById,
  );
  app.get(
    `${defaultRoute}/filter`,
    searchClientsByFilter,
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
  app.delete(
    `${defaultRoute}/:id`,
    deleteClient,
  );
};
