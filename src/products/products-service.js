const Products = require('./products-model');
const Wishlists = require('../wishlists/wishlists-model');
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
      name: { "$regex": filter, "$options": 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return products;
};

const searchWishlistsByProductOnDatabase = async (productCode) => {
  const wishlistsSearch = await Wishlists.find( { product: { $in: productCode } } );
  const wishlists = wishlistsSearch.map(wishlist => wishlist.id);
  return wishlists;
};

module.exports = {
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchOneProductOnDatabase,
  searchAllProductsOnDatabase,
  searchProductsByFilterOnDatabase,
  searchWishlistsByProductOnDatabase,
};
