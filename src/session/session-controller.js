const jwt = require('jsonwebtoken');
const authConfig = require('../authConfig');
const checkPassword = require('../utils/checkPassword');

const { verfiyClientExists } = require('./session-service');

const autenticateClient = async (req, res) => {
  const { email, password } = req.body;

  const client = await verfiyClientExists({ email });

  if(!client) {
    return res.status(401).json({ error: 'Client not exist' });
  }

  if(!(await checkPassword(password, client.password))) {
    return res.status(401).json({ error: 'Invalid Password' });
  }

  const { id, name } = client;

  return res.json({
    client: {
      id,
      name,
      email,
    },
    token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
    message: 'Successfully authenticated',
  });
};

module.exports = {
  autenticateClient,
};
