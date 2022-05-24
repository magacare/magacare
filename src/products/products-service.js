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

<<<<<<< HEAD
const searchOneProductOnDatabase = (code) => Products.find({ code });
=======
const searchOneProductOnDatabase = async (code) => {
  const product = await Products.find({ code });
  return product;
};
>>>>>>> 89e6c83 (mlc: add get all products)

const searchAllProductsOnDatabase = async () => {
  const products = await Products.find({});
  return products;
}

module.exports = {
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchOneProductOnDatabase,
  searchAllProductsOnDatabase,
};
