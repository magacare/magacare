const httpStatus = require('http-status');
const { createProductOnDatabase, updateProductOnDatabase } = require('./products-service');

const createProduct = (req, res) => {
  try {
    const product = req.body;
    createProductOnDatabase(product);

    return res.status(httpStatus.CREATED).json({
      messagem: 'Product registered',
    });
  } catch (error) {
    return res.status(httpStatus[404]).json(error);
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

module.exports = {
  createProduct,
  updateProduct,
};
