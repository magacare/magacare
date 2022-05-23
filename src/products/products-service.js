const Products = require('./products-model');

const createProductOnDatabase = (product) => {
  const productCreated = Products(product);
  return productCreated.save();
};

const updateProductOnDatabase = async (code, product) => {
  const productUpdated = await Products.findOneAndUpdate(code, { $set: product }, { new: true });
  return productUpdated;
};

const verifyExistsProducts = async (value) => {
  const data = await Products.findOne(value);
  return data;
};

const searchOneProductOnDatabase = (code) => {
  let params = {};
  if(code !== undefined && code !== null) {
    params = { code: code };
  }
  return Products.find(params);
};

module.exports = {
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchOneProductOnDatabase
};
