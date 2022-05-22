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

const updateClient = async(req,res) => {
  try {
    const {id,client} = req.body;
    await updateClientOnDatabase(id,client)
  } catch (error) {
    return res.status(httpStatus[404]).json(error);
  }
}




module.exports = {
  createClient,
  updateClient,
};
