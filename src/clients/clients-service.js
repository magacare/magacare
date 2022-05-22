const Client = require('./clients-model');

const createClientOnDatabase = (client) => {
  const clientCreated = Client(client);
  return clientCreated.save();
};

const searchOneClientByIdOnDatabase = (id) => {
    const params = {};
    if(id !== undefined && id !== null) {
      params._id = id;
    }
    return Client.find(params);
}

module.exports = {
  createClientOnDatabase,
  searchOneClientByIdOnDatabase
};
