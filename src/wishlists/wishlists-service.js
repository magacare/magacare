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

const searchWishlistsByClientIdOnDatabase = async (clientId) => {
  const wishlistSearch = await Wishlists.find({ client: clientId });
  const wishlistsIdAndProducts = wishlistSearch.map(wishlist => {
    const wishlistModel = {
      id: wishlist.id,
      products: wishlist.product
    }
    return wishlistModel;
  })
  return wishlistsIdAndProducts;
};

const searchAllWishlistsOnDatabase = () => Wishlists.find({});

const deleteWishlistOnDatabase = async (id) => {
  const wishlistDeleted = await Wishlists.findOneAndDelete({ _id: id });
  return wishlistDeleted;
};

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
  verifyExistsProductsOnWishList,
  searchOneWishlistOnDatabase,
  verifyExistsClient,
  verifyExistsProduct,
  searchAllWishlistsOnDatabase,
  deleteWishlistOnDatabase,
  searchWishlistsByClientIdOnDatabase,
};
