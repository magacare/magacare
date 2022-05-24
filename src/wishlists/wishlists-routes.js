const {
  createWishList,
  updateWishList,
  searchOneWishlist,
  searchAllWishlists,
  searchWishlistsByProduct,
  deleteWishlist,
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
  app.get(
    `${defaultRoute}/product/:code`,
    searchWishlistsByProduct,
  );
  app.get(
    defaultRoute,
    searchAllWishlists,
  );
  app.delete(
    `${defaultRoute}/:id`,
    deleteWishlist,
  );
};
