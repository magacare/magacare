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
  const product = await Products.findOne({ code });
  return product;
};

const searchAllProductsOnDatabase = async () => {
  const products = await Products.find({});
  return products;
};

const searchProductsByNameFilterOnDatabase = async (filter, page, limit) => {
  const productsByName = await Products.find(
    {
      name: { $regex: filter, $options: 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return productsByName;
};

const searchProductsByRecommendationFilterOnDatabase = async (filter, page, limit) => {
  const productsByRecommendation = await Products.find({ recommendation: filter })
    .limit(limit * 1).skip((page - 1) * limit);
  return productsByRecommendation;
};

const searchProductsByFilterOnDatabase = async (searchBy, filter, page, limit) => {
  switch (searchBy) {
    case 'name':
      return searchProductsByNameFilterOnDatabase(filter, page, limit);
    case 'code':
      return searchOneProductOnDatabase(filter);
    case 'recommendation':
      return searchProductsByRecommendationFilterOnDatabase(filter, page, limit);
    default:
      return searchAllProductsOnDatabase();
  }
};

const searchWishlistsByProductOnDatabase = async (productCode) => {
  const wishlistsSearch = await Wishlists.find({ product: { $in: productCode } });
  const wishlists = wishlistsSearch.map((wishlist) => wishlist.id);
  return wishlists;
};

const deleteProductOnDatabase = async (code) => {
  const productDelete = await Products.findOneAndDelete(code);
  return productDelete;
};

module.exports = {
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchOneProductOnDatabase,
  searchAllProductsOnDatabase,
  searchProductsByFilterOnDatabase,
  searchWishlistsByProductOnDatabase,
  deleteProductOnDatabase,
  searchProductsByNameFilterOnDatabase,
  searchProductsByRecommendationFilterOnDatabase,
};
