const Clients = require('../clients/clients-model');

const verfiyClientExists = (client) => Clients.findOne(client);

module.exports = { verfiyClientExists };
