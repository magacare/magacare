const {
  createWishList,
  updateWishList,
  searchOneWishlist,
} = require('./wishlists-controller');

const { WishListSchemaController, WishListSchemaControllerUpdate } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/wishlists';
  app.post(
    defaultRoute,
    validator.validateFields(WishListSchemaController),
    createWishList,
  );
  app.put(
    `${defaultRoute}/:id`,
    validator.validateFields(WishListSchemaControllerUpdate),
    updateWishList,
  );
  app.get(
    `${defaultRoute}/id/:id`,
    searchOneWishlist,
  );
};
