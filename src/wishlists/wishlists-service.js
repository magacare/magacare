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
const verifyExistsClient = (value) => verifyExistsData(Clients, value);
const verifyExistsProduct = (value) => verifyExistsManyData(Products, value);

const searchAllWishlistsOnDatabase = () => Wishlists.find({});

const searchOneWishlistOnDatabase = async (id) => {
  const wishlist = await Wishlists.findOne({ _id: id });
  return wishlist;
};

const searchWishlistsByClientIdOnDatabase = async (clientId) => {
  const wishlistSearch = await Wishlists.find({ client: clientId });
  const wishlistsIdAndProducts = wishlistSearch.map((wishlist) => {
    const wishlistModel = {
      id: wishlist.id,
      title: wishlist.title,
      products: wishlist.product,
    };
    return wishlistModel;
  });
  return wishlistsIdAndProducts;
};

const searchWishlistByClientFilterOnDatabase = async (filter, page, limit) => {
  const wishlists = await Wishlists.find({ client: filter })
    .limit(limit * 1).skip((page - 1) * limit);
  return wishlists;
};

const searchWishlistsByProductFilterOnDatabase = async (filter, page, limit) => {
  const wishlistsByProducts = await Wishlists.find({ product: { $in: filter } })
    .limit(limit * 1).skip((page - 1) * limit);
  return wishlistsByProducts;
};

const searchWishlistByFilterOnDatabase = async (searchBy, filter, page, limit) => {
  switch (searchBy) {
    case 'client':
      return searchWishlistByClientFilterOnDatabase(filter, page, limit);
    case 'id':
      return searchOneWishlistOnDatabase(filter);
    case 'product':
      return searchWishlistsByProductFilterOnDatabase(filter, page, limit);
    default:
      return searchAllWishlistsOnDatabase();
  }
};

const deleteWishlistOnDatabase = async (id) => {
  const wishlistDeleted = await Wishlists.findOneAndDelete({ _id: id });
  return wishlistDeleted;
};

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
  searchOneWishlistOnDatabase,
  verifyExistsClient,
  verifyExistsProduct,
  searchAllWishlistsOnDatabase,
  deleteWishlistOnDatabase,
  searchWishlistsByClientIdOnDatabase,
  searchWishlistByFilterOnDatabase,
  searchWishlistByClientFilterOnDatabase,
  searchWishlistsByProductFilterOnDatabase,
};
