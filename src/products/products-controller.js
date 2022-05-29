const {
  searchOneProductOnDatabase,
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchAllProductsOnDatabase,
  searchProductsByFilterOnDatabase,
  deleteProductOnDatabase,
  searchWishlistsByProductOnDatabase,
} = require('./products-service');

const Wishlists = require('../wishlists/wishlists-model');

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const { code, name } = product;

    const verifyCodeExists = await verifyExistsProducts({ code });
    const verifyNameExists = await verifyExistsProducts({ name });

    if(verifyCodeExists) {
      return res.status(400).json({
        message: 'This code already exists',
      });
    }

    if(verifyNameExists) {
      return res.status(400).json({
        message: 'This name already exists',
      });
    }

    createProductOnDatabase(product);
    return res.status(201).json({
      message: 'Product registered',
    });
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const { name } = req.body;

    const productExists = await verifyExistsProducts({ name });

    if(productExists && productExists.code !== code) {
      return res.status(400).json({
        message: 'This name already exists',
      });
    }

    const productUpdated = await updateProductOnDatabase(code, req.body);
    return res.status(200).json({
      message: 'Product updated',
      product: productUpdated,
    });
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

const searchOneProduct = async (req, res) => {
  try {
    const product = await searchOneProductOnDatabase(req.params.code);
    if(product) {
      return res.status(200).json(product);
    } return res.status(400).json({ error: 'No product found.' });
  } catch(error) {
    return res.status(404).json({ error: 'Error finding product.' });
  }
};

const searchAllProducts = async (req, res) => {
  try {
    const products = await searchAllProductsOnDatabase();
    return res.status(200).json(products);
  } catch(error) {
    return res.status(404).json({ error: 'Error finding product.' });
  }
};

const searchProductsByFilter = async (req, res) => {
  try {
    const {
      searchBy, filter, page = 1, limit = 5,
    } = req.query;
    const products = await searchProductsByFilterOnDatabase(searchBy, filter, page, limit);
    if(products.length !== 0) {
      return res.status(200).json(products);
    } return res.status(400).json({ error: 'No product found.' });
  } catch(error) {
    return res.status(404).json({ error: 'Error finding product.' });
  }
};

const searchWishlistsByProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const wishlists = await searchWishlistsByProductOnDatabase(code);

    if(wishlists.length !== 0) {
      return res.status(200).json(wishlists);
    } return res.status(400).json({ error: 'No wishlist founded.' });
  } catch(error) {
    return res.status(404).json({ error: 'Error finding product.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { code } = req.params;

    const findProductInWishlist = await Wishlists.find({ product: code });

    if(findProductInWishlist.length > 0) {
      return res.status(400).json({
        message: 'Product cannot be deleted as it is on a wish list',
      });
    }

    const productDeleted = await deleteProductOnDatabase({ code });

    if(!productDeleted) {
      return res.status(404).json({
        message: 'Product not exists',
      });
    }

    return res.status(200).json({
      message: 'Product deleted',
      client: productDeleted,
    });
  } catch(error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  searchOneProduct,
  searchAllProducts,
  searchProductsByFilter,
  searchWishlistsByProduct,
  deleteProduct,
};
