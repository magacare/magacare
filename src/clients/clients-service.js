const Client = require('./clients-model');

const createClientOnDatabase = (client) => {
  const clientCreated = Client(client);
  return clientCreated.save();
};

const searchOneClientByIdOnDatabase = (id) => {
    const params = {};
    if(id !== undefined && id !== null) {
      params._id = id;
      return Client.find(params);
    }
    return Client.find(params);
}


const updateClientOnDatabase = async (id, client) => {
  const clientUpdated = await Client.findOneAndUpdate({ _id: id }, { $set: client }, { new: true });
  return clientUpdated;
};

module.exports = {
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase
};
