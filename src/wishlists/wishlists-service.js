const Wishlists = require('./wishlists-model');
const Products = require('../products/products-model');
const Clients = require('../clients/clients-model');

const { verifyExistsData, verifyExistsManyData } = require('../validate/validate');

const createWishListOnDatabase = (wishlist) => {
  const clientCreated = Wishlists(wishlist);
  return clientCreated.save();
};

const updateWishListOnDatabase = async (id, wishlist) => {
  const update = wishlist.product ? {
    title: wishlist.title,
    $push: { product: { $each: wishlist.product } },
  } : { title: wishlist.title };

  const wishlistUpdated = await Wishlists.findOneAndUpdate(
    { _id: id },
    update,
    { new: true },
  );
  return wishlistUpdated;
};

const verifyExistsWishList = (value) => verifyExistsData(Wishlists, value);
const verifyExistsProductsOnWishList = (value) => verifyExistsManyData(Wishlists, value);
const verifyExistsClient = (value) => verifyExistsData(Clients, value);
const verifyExistsProduct = (value) => verifyExistsManyData(Products, value);

const searchOneWishlistOnDatabase = (id) => Wishlists.findOne({ id });

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
  verifyExistsProductsOnWishList,
  searchOneWishlistOnDatabase,
  verifyExistsClient,
  verifyExistsProduct,
};
