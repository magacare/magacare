const { createProductOnDatabase, updateProductOnDatabase, searchOneProductOnDatabase } = require('./products-service');

const createProduct = (req, res) => {
  try {
    const product = req.body;
    createProductOnDatabase(product);

    return res.status(201).json({
      messagem: 'Product registered',
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const product = req.body;

    const productUpdated = await updateProductOnDatabase(code, product);
    return res.status(200).json({
      message: 'Product updated',
      product: productUpdated,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

const searchOneProduct = async (req, res) => {
  try {
    const product = await searchOneProductOnDatabase(req.params.code);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchAllProducts = async (req, res) => {
  try {
    const products = await searchOneProductOnDatabase();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  searchOneProduct,
  searchAllProducts
};
