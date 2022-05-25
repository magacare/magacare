const {
  createProduct, updateProduct, searchOneProduct, searchAllProducts, searchProductsByFilter, searchWishlistsByProduct
} = require('./products-controller');
const { ProductSchemaController, ProductSchemaControllerUpdate } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/products';
  app.post(
    defaultRoute,
    validator.validateFields(ProductSchemaController),
    createProduct,
  );
  app.put(
    `${defaultRoute}/:code`,
    validator.validateFields(ProductSchemaControllerUpdate),
    updateProduct,
  );
  app.get(
    `${defaultRoute}/code/:code`,
    searchOneProduct,
  );
  app.get(
    `${defaultRoute}/wishlists/:code`,
    searchWishlistsByProduct,
  );
  app.get(
    defaultRoute,
    searchAllProducts,
  );
  app.get(
    `${defaultRoute}/filter`,
    searchProductsByFilter,
  );
};
