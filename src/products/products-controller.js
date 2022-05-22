const httpStatus = require('http-status');
const { createProductOnDatabase } = require('./products-service');

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

module.exports = {
  createProduct,
};
