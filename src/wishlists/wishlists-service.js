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

const searchOneWishlistOnDatabase = async (id) => {
  const wishlist = await Wishlists.findOne({ _id: id });
  return wishlist;
};

const searchWishlistsByProductOnDatabase = async (productCode) => {
  const wishlistsSearch = await Wishlists.find( { product: { $in: productCode } } );
  const wishlists = wishlistsSearch.map(wishlist => wishlist.id);
  return wishlists;
};

const searchAllWishlistsOnDatabase = () => Wishlists.find({});

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
  verifyExistsProductsOnWishList,
  searchOneWishlistOnDatabase,
  verifyExistsClient,
  verifyExistsProduct,
  searchAllWishlistsOnDatabase,
  searchWishlistsByProductOnDatabase,
};
