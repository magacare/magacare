const Wishlists = require('./wishlists-model');

const createWishListOnDatabase = (wishlist) => {
  const clientCreated = Wishlists(wishlist);
  return clientCreated.save();
};

const updateWishListOnDatabase = async (id, wishlist) => {
  const wishlistUpdated = await Wishlists.findOneAndUpdate({ _id: id }, { $set: wishlist }, { new: true });
  return wishlistUpdated;
};

const verifyExistsWishList = async (value) => {
  const data = await Wishlists.findOne(value);
  return data;
};

const searchOneWishlistOnDatabase = (id) => {
  let params = {};
  if(id !== undefined && id !== null) {
    params = { _id: id };
    return Wishlist.find(params);
  }
  return Wishlist.find(params);
};

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
  searchOneWishlistOnDatabase
};
