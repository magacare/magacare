const Wishlists = require('./wishlists-model');
const { verifyExistsData } = require('../validate/validate');

const createWishListOnDatabase = (wishlist) => {
  const clientCreated = Wishlists(wishlist);
  return clientCreated.save();
};

const updateWishListOnDatabase = async (id, wishlist) => {
  const wishlistUpdated = await Wishlists.findOneAndUpdate({ _id: id }, { $set: wishlist }, { new: true });
  return wishlistUpdated;
};

const verifyExistsWishList = (value) => verifyExistsData(Wishlists, value);

const searchOneWishlistOnDatabase = (id) => {
  let params = {};
  if(id !== undefined && id !== null) {
    params = { _id: id };
    return Wishlists.find(params);
  }
  return Wishlists.find(params);
};

module.exports = {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  verifyExistsWishList,
  searchOneWishlistOnDatabase,
};
