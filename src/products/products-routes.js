<<<<<<< HEAD
const {
  createProduct, updateProduct, searchOneProduct,
=======
const { 
  createProduct, updateProduct, searchOneProduct, searchAllProducts,
>>>>>>> 89e6c83 (mlc: add get all products)
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
    defaultRoute,
    searchAllProducts,
  );
};
