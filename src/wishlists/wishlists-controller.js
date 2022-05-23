const {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  searchOneWishlistOnDatabase,
  verifyExistsWishList,
} = require('./wishlists-service');

const createWishList = async (req, res) => {
  try {
    const wishList = req.body;
    const { title } = wishList;

    const verifyTitleExists = await verifyExistsWishList({ title });

    if(verifyTitleExists) {
      return res.status(400).json({
        error: 'This title already exists',
      });
    }

    createWishListOnDatabase(wishList);
    return res.status(201).json({
      error: 'WishList registered',
    });
  } catch (error) {
    return res.status(404).json(error);
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

const searchOneWishlist = async (req, res) => {
  try {
    const wishlist = await searchOneWishlistOnDatabase(req.params.id);
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchAllWishlists = async (req, res) => {
  try {
    const wishlists = await searchOneWishlistOnDatabase();
    return res.status(200).json(wishlists);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createWishList,
  updateWishList,
  searchOneWishlist,
  searchAllWishlists,
};
