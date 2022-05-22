const Client = require('./clients-model');

const createClientOnDatabase = (client) => {
  const clientCreated = Client(client);
  return clientCreated.save();
};

const updateClientOnDatabase = (id, client) => {
  return Client.findOneAndUpdate({ _id: id }, client, { new: true })
}

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
};
