const {
  updateClient,
  searchOneClientById,
  searchOneClientByEmail,
  searchAllClients,
  searchClientsByFilter,
  deleteClient,
  searchWishlistByClient,
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
    searchOneClientById,
  );
  app.get(
    `${defaultRoute}/search`,
    searchClientsByFilter,
  );
  app.get(
    `${defaultRoute}/wishlists/:id`,
    searchWishlistByClient,
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
