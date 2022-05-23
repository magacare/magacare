const { createProduct, updateProduct, searchOneProduct, searchAllProducts } = require('./products-controller');
const { ProductSchemaController } = require('../validate/schema-controller');
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
    validator.validateFields(ProductSchemaController),
    updateProduct,
  );
  app.get(
      `${defaultRoute}/:code`,
      searchOneProduct
    );
    app.get(
      defaultRoute,
      searchAllProducts
    );
};
