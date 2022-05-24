const Clients = require('./clients-model');
const { verifyExistsData } = require('../validate/validate');

const createClientOnDatabase = (client) => {
  const clientCreated = Clients(client);
  return clientCreated.save();
};

const searchOneClientByIdOnDatabase = (id) => {
  return Clients.findOne({ id })
};

const searchOneClientByEmailonDatabase = (email) => {
  return Clients.findOne({ email });
};

const searchClientsByFilterOnDatabase = async (filter, page, limit) => {
  const clients = await Clients.find(
    {
      "fullName": { $regex: filter, $options: 'i' }
    },
  ).limit(limit*1).skip((page-1)*limit);
  return clients;
};

const searchAllClientsOnDatabase = async () => {
  const clients = await Clients.find({});
  return clients;
}

const updateClientOnDatabase = async (id, client) => {
  const clientUpdated = await Clients.findOneAndUpdate({ _id: id }, { $set: client }, { new: true });
  return clientUpdated;
};

const verifyExistsClients = (value) => verifyExistsData(Clients, value);

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase,
  searchOneClientByEmailonDatabase,
  searchClientsByFilterOnDatabase,
  verifyExistsClients,
  searchAllClientsOnDatabase
};
