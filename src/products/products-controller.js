const {
  searchOneProductOnDatabase,
  createProductOnDatabase,
  updateProductOnDatabase,
  verifyExistsProducts,
  searchAllProductsOnDatabase,
} = require('./products-service');

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
      messagem: 'Product registered',
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const { name } = req.body;

    const verifyNameExists = await verifyExistsProducts({ name });

    if(verifyNameExists) {
      return res.status(400).json({
        message: 'This name already exists',
      });
    }

    const productUpdated = await updateProductOnDatabase(code, req.body);
    return res.status(200).json({
      message: 'Product updated',
      product: productUpdated,
    });
  } catch (error) {
    return res.status(404).json(error.message);
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
    const products = await searchAllProductsOnDatabase();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  searchOneProduct,
<<<<<<< HEAD
=======
  searchAllProducts,
>>>>>>> 89e6c83 (mlc: add get all products)
};
