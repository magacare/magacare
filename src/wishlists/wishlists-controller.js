const httpStatus = require('http-status');
const { createWishListOnDatabase } = require('./wishlists-service');

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

module.exports = {
  createWishList,
};
