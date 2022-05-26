const {
  createWishListOnDatabase,
  updateWishListOnDatabase,
  searchOneWishlistOnDatabase,
  deleteWishlistOnDatabase,
  verifyExistsWishList,
  verifyExistsClient,
  verifyExistsProduct,
  searchAllWishlistsOnDatabase,
  searchWishlistsByClientIdOnDatabase,
  searchWishlistByFilterOnDatabase,
  deleteProductOnDatabase,
} = require('./wishlists-service');

const createWishList = async (req, res) => {
  try {
    const wishList = req.body;
    const { product: code, client } = wishList;

    if(code.length <= 0) {
      return res.status(400).json({
        error: 'The wish list should have one product at least',
      });
    }

    const clientExists = await verifyExistsClient({ _id: client });

    if(!clientExists) {
      return res.status(400).json({
        error: 'This client does not exist',
      });
    }

    const duplicatedCodes = code.filter(((productCode) => (item) => productCode.has(item) || !productCode.add(item))(new Set()));

    if(duplicatedCodes.length > 0) {
      return res.status(400).json({
        error: 'You cannot add duplicate products',
        products: duplicatedCodes,
      });
    }

    const productExists = code && await verifyExistsProduct({ code: { $in: [...code] } });

    const productsNotExists = [];

    if(code) {
      code.forEach((item) => {
        const existProduct = productExists.find((prod) => prod.code === item);
        if(!existProduct) {
          productsNotExists.push(item);
        }
      });
    }

    if(code && productsNotExists.length > 0) {
      return res.status(400).json({
        error: 'You cannot add product not existent',
        products: productsNotExists,
      });
    }

    createWishListOnDatabase(wishList);

    return res.status(201).json({
      message: 'WishList registered',
    });
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const updateWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = req.body;
    const { product: code } = wishlist;

    if(code.length <= 0) {
      return res.status(400).json({
        error: 'The wish list update should have one product at least',
      });
    }

    const duplicatedCodesSent = code.filter(((productCode) => (item) => productCode.has(item) || !productCode.add(item))(new Set()));
    if(duplicatedCodesSent.length > 0) {
      return res.status(400).json({
        error: 'You cannot add duplicate products',
        products: duplicatedCodesSent,
      });
    }

    const wishListFound = code && await verifyExistsWishList({ _id: id });
    const productsInWhishList = wishListFound.product;
    const productsDuplicated = code.filter((product) => {
      const findOnWhisList = productsInWhishList.find((p) => p === product);
      if(findOnWhisList) {
        return product;
      }
      return false;
    });

    if(productsDuplicated.length > 0) {
      return res.status(400).json({
        error: 'You cannot add duplicate products',
        products: productsDuplicated,
      });
    }

    const productExists = code && await verifyExistsProduct({ code: { $in: [...code] } });

    const productsNotExists = [];

    if(code.length > 0) {
      code.forEach((item) => {
        const existProduct = productExists.find((prod) => prod.code === item);
        if(!existProduct) {
          productsNotExists.push(item);
        }
      });
    }

    if(code && productsNotExists.length > 0) {
      return res.status(400).json({
        error: 'You cannot add products not existents',
        products: productsNotExists,
      });
    }

    const wishlistUpdated = await updateWishListOnDatabase(id, wishlist);

    return res.status(200).json({
      message: 'Wishlist updated',
      wishlist: wishlistUpdated,
    });
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const searchOneWishlist = async (req, res) => {
  try {
    const wishlist = await searchOneWishlistOnDatabase(req.params.id);
    return res.status(200).json(wishlist);
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const searchWishlistsByClientId = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlists = await searchWishlistsByClientIdOnDatabase(id);
    return res.status(200).json(wishlists);
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const searchWishlistsByFilter = async (req, res) => {
  try {
    const {
      searchBy, filter, page = 1, limit = 5,
    } = req.query;
    const wishlists = await searchWishlistByFilterOnDatabase(searchBy[0], filter[0], page[0], limit[0]);
    return res.status(200).json(wishlists);
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const searchAllWishlists = async (req, res) => {
  try {
    const wishlists = await searchAllWishlistsOnDatabase();
    return res.status(200).json(wishlists);
  } catch(error) {
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
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const deleteProductOnWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { product: code } = req.body;

    const wishListFound = await verifyExistsWishList({ _id: id });

    if(!wishListFound) {
      return res.status(200).json({
        message: 'Wishlist not found',
      });
    }

    if(code.length > 0 && wishListFound.product.length > 1) {
      const productsExistsOnList = wishListFound.product;
      code.filter((product) => {
        const findOnWhisList = productsExistsOnList.find((p) => p === product);
        if(!findOnWhisList) {
          return res.status(200).json({
            message: 'Product not exist in wishlist',
          });
        }
        return false;
      });

      const findProduct = (value) => code.find((item) => item === value);
      const newProductsOnWishList = wishListFound.product.filter((p) => p !== findProduct(p));

      const newWishList = {
        title: wishListFound.title,
        client: wishListFound.client,
        product: newProductsOnWishList,
      };

      const productDelete = await deleteProductOnDatabase(id, newWishList);

      return res.status(200).json({
        message: 'Product deleted in wishlist successfully',
        product: productDelete,
      });
    }

    return res.status(200).json({
      message: 'You cannot delete if the list has only one product',
    });
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createWishList,
  updateWishList,
  searchOneWishlist,
  searchAllWishlists,
  deleteWishlist,
  searchWishlistsByClientId,
  searchWishlistsByFilter,
  deleteProductOnWishlist,
};
