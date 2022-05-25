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

<<<<<<< HEAD
const searchClientsByFilterOnDatabase = async (filter, page, limit) => {
  const clients = await Clients.find(
    {
      fullName: { "$regex": filter, "$options": 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return clients;
};

const searchClientByWishlistOnDatabase = async (idWishlist) => {
  const searchWishlist = await Wishlists.findOne({ _id: idWishlist });
  const { client } = searchWishlist;
  const searchClient = await Clients.findOne({_id: client});
  return searchClient;
}

=======
>>>>>>> af6265dc5c4aa34eda1ac5b4aeab9a812760d905
const searchAllClientsOnDatabase = async () => {
  const clientsFound = await Clients.find({});
  return clientsFound;
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

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase,
  searchOneClientByEmailonDatabase,
  verifyExistsClients,
  searchAllClientsOnDatabase,
  searchClientsByFilterOnDatabase,
};
