const Clients = require('./clients-model');
const { verifyExistsData } = require('../validate/validate');

const createClientOnDatabase = (client) => {
  const clientCreated = Clients(client);
  return clientCreated.save();
};

const searchOneClientOnDatabase = (id) => {
  let params = {};
  if(id !== undefined && id !== null) {
    params = { _id: id };
    return Clients.findOne(params)
  } else {
    return Clients.find(params);
  }
};

const updateClientOnDatabase = async (id, client) => {
  const clientUpdated = await Clients.findOneAndUpdate({ _id: id }, { $set: client }, { new: true });
  return clientUpdated;
};

const verifyExistsClients = (value) => verifyExistsData(Clients, value);

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientOnDatabase,
  verifyExistsClients,
};
