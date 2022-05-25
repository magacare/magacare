const bcryptpjs = require('bcryptjs');
const {
  verifyExistsClients,
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase,
  searchOneClientByEmailonDatabase,
  searchAllClientsOnDatabase,
  searchClientsByFilterOnDatabase,
  searchClientByWishlistOnDatabase,
} = require('./clients-service');

const checkPassword = require('../utils/checkPassword');

const createClient = async (req, res) => {
  try {
    const client = req.body;
    const { email, cpf, password } = client;

    const verifyEmailExists = await verifyExistsClients({ email });
    const verifyCpfExists = await verifyExistsClients({ cpf });

    if(verifyEmailExists) {
      return res.status(400).json({
        message: 'This email already exists',
      });
    }

    if(verifyCpfExists) {
      return res.status(400).json({
        message: 'This cpf already exists',
      });
    }

    const hashPassword = await bcryptpjs.hash(password, 8);

    const clientWithEncryptedPassword = {
      ...client,
      password: hashPassword,
    };

    createClientOnDatabase(clientWithEncryptedPassword);

    return res.status(201).json({
      message: 'Client registered',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const searchOneClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await searchOneClientByIdOnDatabase(id);
    return res.status(200).json(client);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchOneClientByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const client = await searchOneClientByEmailonDatabase(email);
    return res.status(200).json(client);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchClientsByFilter = async (req, res) => {
  try {
    const { filter, page = 1, limit = 5 } = req.query;

    const clients = await searchClientsByFilterOnDatabase(filter, page, limit);
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchClientByWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await searchClientByWishlistOnDatabase(id);
    return res.status(200).json(client);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchAllClients = async (req, res) => {
  try {
    const clients = await searchAllClientsOnDatabase();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = req.body;

    const {
      email, cpf, password, confirmPassword, oldPassword,
    } = client;

    const verifyIdExists = await verifyExistsClients({ _id: id });
    const verifyEmailExists = await verifyExistsClients({ email });
    const verifyCpfExists = await verifyExistsClients({ cpf });

    if(verifyEmailExists && !email) {
      return res.status(400).json({
        message: 'This email already exists',
      });
    }

    if(verifyCpfExists && !cpf) {
      return res.status(400).json({
        message: 'This cpf already exists',
      });
    }

    if(verifyIdExists) {
      const clientRegistered = verifyIdExists;

      if((!(oldPassword && confirmPassword) && password)) {
        return res
          .status(401)
          .json({ error: '"oldPassword" and "confirmPassword" are required to update password' });
      }

      if(oldPassword && !(await checkPassword(oldPassword, clientRegistered.password))) {
        return res
          .status(401)
          .json({ error: 'This password does not match' });
      }
      const hashPassword = oldPassword && confirmPassword && password
        ? await bcryptpjs.hash(confirmPassword, 8)
        : clientRegistered.password;

      const newClient = {
        ...client,
        password: hashPassword,
      };

      const clientUpdated = await updateClientOnDatabase(id, newClient);
      return res.status(200).json({
        message: 'Client updated',
        client: clientUpdated,
      });
    }

    return res.status(404).json({
      message: 'Please, return a valid id',
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  createClient,
  updateClient,
  searchOneClienteById,
  searchOneClientByEmail,
  searchAllClients,
  searchClientsByFilter,
  searchClientByWishlist
};
