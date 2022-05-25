const Clients = require('./clients-model');
const Wishlists = require('../wishlists/wishlists-model');
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

const searchClientsByFilterOnDatabase = async (filter, page, limit) => {
  const clients = await Clients.find(
    {
      fullName: { $regex: filter, $options: 'i' },
    },
  ).limit(limit * 1).skip((page - 1) * limit);
  return clients;
};

const searchWishlistByClientOnDatabase = async (idClient) => {
  const wishlists = await Wishlists.find({ client: idClient });
  const idsWishlists = wishlists.map(wishlist => wishlist.id);
  return idsWishlists;
}

const searchAllClientsOnDatabase = async () => {
  const clientsFound = await Clients.find({});
  return clientsFound;
};

const updateClientOnDatabase = async (id, client) => {
  const clientUpdated = await Clients.findOneAndUpdate({ _id: id }, { $set: client }, { new: true });
  return clientUpdated;
};

const verifyExistsClients = (value) => verifyExistsData(Clients, value);

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
  deleteClientOnDatabase,
  searchWishlistByClientOnDatabase
};
