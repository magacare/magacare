const Clients = require('./clients-model');
const { verifyExistsData } = require('../validate/validate');

const createClientOnDatabase = (client) => {
  const clientCreated = Clients(client);
  return clientCreated.save();
};

const searchOneClientByIdOnDatabase = async (id) => {
  const clientFound = await Clients.findOne({ _id: id });
  return clientFound;
};

const searchOneClientByEmailonDatabase = async (email) => {
  const clientFound = await Clients.findOne({ email });
  return clientFound;
};

const searchAllClientsOnDatabase = async () => {
  const clientsFound = await Clients.find({});
  return clientsFound;
};

const searchOneClientOnDatabase = (id) => {
  let params = {};
  if(id !== undefined && id !== null) {
    params = { _id: id };
    return Clients.findOne(params);
  }
  return Clients.find(params);
};

const updateClientOnDatabase = async (id, client) => {
  const clientUpdated = await Clients.findOneAndUpdate({ _id: id }, { $set: client }, { new: true });
  return clientUpdated;
};

const verifyExistsClients = (value) => verifyExistsData(Clients, value);

const searchClientsByFilterOnDatabase = async (filter, page, limit) => {
  const clients = await Clients.find(
    {
      fullName: { $regex: filter, $options: 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return clients;
};

const deleteClientOnDatabase = async (id) => {
  const clientDeleted = await Clients.findOneAndDelete(id);
  return clientDeleted;
};

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase,
  searchOneClientByEmailonDatabase,
  verifyExistsClients,
  searchAllClientsOnDatabase,
  searchClientsByFilterOnDatabase,
  searchOneClientOnDatabase,
  deleteClientOnDatabase,
};
