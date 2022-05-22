const Wishlist = require('./wishlists-model');

const createWishListOnDatabase = (wishlist) => {
  const clientCreated = Wishlist(wishlist);
  return clientCreated.save();
};

module.exports = {
  createWishListOnDatabase,
};
