const Client = require('./clients-model');

const createClientOnDatabase = (client) => {
  const clientCreated = Client(client);
  return clientCreated.save();
};

module.exports = {
  createClientOnDatabase,
};
