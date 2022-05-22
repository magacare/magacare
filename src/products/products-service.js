const Products = require('./products-model');

const createProductOnDatabase = (product) => {
  const productCreated = Products(product);
  return productCreated.save();
};

module.exports = {
  createProductOnDatabase,
};
