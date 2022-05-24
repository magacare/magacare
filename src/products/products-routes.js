const {
  createProduct, updateProduct, searchOneProduct,
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
};
