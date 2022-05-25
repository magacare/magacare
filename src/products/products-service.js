const Products = require('./products-model');
const { verifyExistsData } = require('../validate/validate');

const createProductOnDatabase = (product) => {
  const productCreated = Products(product);
  return productCreated.save();
};

const updateProductOnDatabase = async (code, product) => {
  const productUpdated = await Products.findOneAndUpdate({ code }, { $set: product }, { new: true });
  return productUpdated;
};

const verifyExistsProducts = (value) => verifyExistsData(Products, value);

const searchOneProductOnDatabase = async (code) => {
  const product = await Products.find({ code });
  return product;
};

const searchAllProductsOnDatabase = async () => {
  const products = await Products.find({});
  return products;
};

const searchProductsByFilterOnDatabase = async (filter, page, limit) => {
  const products = await Products.find(
    {
      name: { $regex: filter, $options: 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return products;
};

module.exports = {
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchOneProductOnDatabase,
  searchAllProductsOnDatabase,
  searchProductsByFilterOnDatabase,
};
