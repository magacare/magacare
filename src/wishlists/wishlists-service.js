const Wishlist = require('./wishlists-model');

const createWishListOnDatabase = (wishlist) => {
  const clientCreated = Wishlist(wishlist);
  return clientCreated.save();
};

const updateWishListOnDatabase = async (id, wishlist) => {
  const wishlistUpdated = await Wishlist.findOneAndUpdate({ _id: id }, { $set: wishlist }, { new: true });
  return wishlistUpdated;
};

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
};
