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

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
};
