const {
  createClient,
  updateClient,
  searchOneClienteById,
  searchOneClientByEmail,
  searchAllClients,
  searchClientsByFilter,
  searchClientByWishlist,
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
    `${defaultRoute}/filter`,
    searchClientsByFilter,
  );
  app.get(
    `${defaultRoute}/wishlist/:id`,
    searchClientByWishlist,
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
