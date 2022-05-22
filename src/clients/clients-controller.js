const httpStatus = require('http-status');
const { createClientOnDatabase, updateClientOnDatabase } = require('./clients-service');

const createClient = (req, res) => {
  try {
    const client = req.body;
    createClientOnDatabase(client);

    return res.status(httpStatus.CREATED).json({
      message: 'User registered',
    });
  } catch (error) {
    return res.status(httpStatus[404]).json(error);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = req.body;

    const clientUpdated = await updateClientOnDatabase(id, client);
    return res.status(200).json({
      message: 'Client updated',
      client: clientUpdated,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createClient,
  updateClient,
};
