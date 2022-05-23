const Wishlist = require('./wishlists-model');

const createWishListOnDatabase = (wishlist) => {
  const clientCreated = Wishlist(wishlist);
  return clientCreated.save();
};

const updateWishListOnDatabase = async (id, wishlist) => {
  const wishlistUpdated = await Wishlist.findOneAndUpdate({ _id: id }, { $set: wishlist }, { new: true });
  return wishlistUpdated;
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
  searchOneWishlistOnDatabase
};
