const {
  verifyExistsClients,
  createClientOnDatabase,
  updateClientOnDatabase,
  searchOneClientByIdOnDatabase,
} = require('./clients-service');

const createClient = async (req, res) => {
  try {
    const client = req.body;
    const { email, cpf } = client;

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

    createClientOnDatabase(client);

    return res.status(201).json({
      message: 'Client registered',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const searchOneClienteById = async (req, res) => {
  try {
    const search = await searchOneClientByIdOnDatabase(req.params.id);
    return res.status(200).json(search);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const searchAllClients = async (req, res) => {
  try {
    const search = await searchOneClientByIdOnDatabase();
    return res.status(200).json(search);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = req.body;

    const clientUpdated = await updateClientOnDatabase(id, client);
    return res.status(200).json({
      message: 'Client updated',
      client: clientUpdated,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = {
  createClient,
  updateClient,
  searchAllClients,
  searchOneClienteById,
};
