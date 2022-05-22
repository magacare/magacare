const httpStatus = require('http-status');
const clientsService = require('./clients-service');

const createClient = (req, res) => {
  try {
    const client = req.body;
    clientsService.createClientOnDatabase(client);

    return res.status(httpStatus.CREATED).json({
      message: 'User registered',
    });
  } catch (error) {
    return res.status(httpStatus[404]).json(error);
  }
};

const searchOneClienteById = async (req, res) => {
  try {
    let search = await clientsService.searchOneClientOnDatabase(req.params._id);
    return res.status(httpStatus[200]).json(search);
  } catch (error) {
    return res.status(httpStatus[404]).json(error)
  }
}

const searchOneClienteByEmail = async (req, res) => {
  try {
    let search = await clientsService.searchOneClientOnDatabase(req.params.email);
    return res.status(httpStatus[200]).json(search);
  } catch (error) {
    return res.status(httpStatus[404]).json(error)
  }
}

module.exports = {
  createClient,
  searchOneClienteById,
  searchOneClienteByEmail
};
