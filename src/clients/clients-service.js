const Clients = require('./clients-model');

const createClientOnDatabase = (client) => {
  const clientCreated = Clients(client);
  return clientCreated.save();
};

const searchOneClientByIdOnDatabase = (id) => {
  let params = {};
  if(id !== undefined && id !== null) {
    params = { _id: id };
  }
  return Clients.find(params);
};

const updateClientOnDatabase = async (id, client) => {
  const clientUpdated = await Clients.findOneAndUpdate({ _id: id }, { $set: client }, { new: true });
  return clientUpdated;
};

const verifyExists = async (value) => {
  const data = await Clients.findOne(value);
  return data;
};

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase,
  verifyExists,
};
