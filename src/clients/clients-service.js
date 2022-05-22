const Client = require('./clients-model');

const createClientOnDatabase = (client) => {
  const clientCreated = Client(client);
  return clientCreated.save();
};

const searchOneClientOnDatabase = (idOrEmail) => {
  const params = {identifyer: idOrEmail};
  return Product.findOne(params);
}

module.exports = {
  createClientOnDatabase,
  searchOneClientOnDatabase,
};
