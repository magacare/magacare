const httpStatus = require('http-status');
const { createWishListOnDatabase, updateWishListOnDatabase } = require('./wishlists-service');

const createWishList = (req, res) => {
  try {
    const wishList = req.body;
    createWishListOnDatabase(wishList);

    return res.status(httpStatus.CREATED).json({
      message: 'WishList registered',
    });
  } catch (error) {
    return res.status(httpStatus[404]).json(error);
  }
};

const updateWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = req.body;

    const wishlistUpdated = await updateWishListOnDatabase(id, wishlist);
    return res.status(200).json({
      message: 'Wishlist updated',
      wishlist: wishlistUpdated,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createWishList,
  updateWishList,
};
