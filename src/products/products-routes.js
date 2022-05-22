const { createProduct } = require('./products-controller');
const { ProductSchemaController } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/products';
  app.post(
    defaultRoute,
    validator.validateFields(ProductSchemaController),
    createProduct,
  );
};
