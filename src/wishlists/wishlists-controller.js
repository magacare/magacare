const {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  searchOneWishlistOnDatabase,
  deleteWishlistOnDatabase,
  verifyExistsWishList,
  verifyExistsClient,
  verifyExistsProduct,
  verifyExistsProductsOnWishList,
  searchAllWishlistsOnDatabase,
  searchWishlistsByProductOnDatabase,
} = require('./wishlists-service');

const createWishList = async (req, res) => {
  try {
    const wishList = req.body;
    const { title, product: code, client } = wishList;

    const verifyTitleExists = await verifyExistsWishList({ title });
    const clientExists = await verifyExistsClient({ _id: client });

    if (verifyTitleExists) {
      return res.status(400).json({
        error: 'This title already exists',
      });
    }

    const productExistsOnWishLists = code && await verifyExistsProductsOnWishList({ product: { $in: [...code] } });

    if (code && productExistsOnWishLists.length > 1) {
      return res.status(400).json({
        error: 'The wish list has products duplicate',
        products: code,
      });
    }

    const productExists = code && await verifyExistsProduct({ code: { $in: [...code] } });

    const productsNotExists = [];

    if (code) {
      code.forEach((item) => {
        const existProduct = productExists.find((prod) => prod.code === item);
        if (!existProduct) {
          productsNotExists.push(item);
        }
      });
    }

    if (code && productsNotExists.length > 0) {
      return res.status(400).json({
        error: 'This products not exist',
        products: productsNotExists,
      });
    }

    if (!clientExists) {
      return res.status(400).json({
        error: 'This client does not exist',
      });
    }

    createWishListOnDatabase(wishList);

    return res.status(201).json({
      message: 'WishList registered',
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

const updateWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = req.body;
    const { title, product: code } = wishlist;

    const verifyTitleExists = await verifyExistsWishList({ title });

    if (verifyTitleExists && !title) {
      return res.status(400).json({
        error: 'This title already exists',
      });
    }

    const productExistsOnWishLists = code && await verifyExistsProductsOnWishList({ product: { $in: code } });

    if (code && productExistsOnWishLists.length > 0) {
      return res.status(400).json({
        error: 'The wish list has products duplicate',
        products: code,
      });
    }

    const productExists = code && await verifyExistsProduct({ code: { $in: [...code] } });
    const productsNotExists = [];

    if (code) {
      code.forEach((item) => {
        const existProduct = productExists.find((prod) => prod.code === item);
        if (!existProduct) {
          productsNotExists.push(item);
        }
      });
    }

    if (code && productsNotExists.length > 0) {
      return res.status(400).json({
        error: 'These products not exist',
        products: productsNotExists,
      });
    }

    const wishlistUpdated = await updateWishListOnDatabase(id, wishlist);

    return res.status(200).json({
      message: 'Wishlist updated',
      wishlist: wishlistUpdated,
    });
  } catch (error) {
    return res.status(404).json(error.message);
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
    const wishlists = await searchAllWishlistsOnDatabase();
    return res.status(200).json(wishlists);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlistDeleted = await deleteWishlistOnDatabase(id);
    return res.status(200).json({
      message: 'wishlist deleted',
      product: wishlistDeleted,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createWishList,
  updateWishList,
  searchOneWishlist,
  searchAllWishlists,
  deleteWishlist,
};
